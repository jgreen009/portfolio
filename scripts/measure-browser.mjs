import {chromium} from '@playwright/test';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
const origin='http://127.0.0.1:5188';
try{await fetch(origin);throw new Error('Port 5188 is already in use')}catch(error){if(error.message.includes('already in use'))throw error}
const server=spawn(process.execPath,['server.mjs','--port','5188'],{stdio:'inherit'});
let browser;
try{
  for(let i=0;i<40;i++){try{await fetch(origin);break}catch{await new Promise(r=>setTimeout(r,250))}}
  browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||'msedge'});
  const results=[];
  for(const [name,path,mobile] of [['home-mobile','/',true],['home-desktop','/',false],['project-mobile','/work/plp-estimate-unifier/',true],['contact-mobile','/contact/',true],['about-mobile','/about/',true],['visual-project-mobile','/work/aurelis-estate/',true]]){
    const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:mobile?3:1,isMobile:mobile,hasTouch:mobile});
    const page=await context.newPage();const cdp=await context.newCDPSession(page);
    await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Emulation.setCPUThrottlingRate',{rate:mobile?4:1});
    await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:mobile?150:40,downloadThroughput:(mobile?1600:10240)*1024/8,uploadThroughput:750*1024/8});
    await page.addInitScript(()=>{
      window.__measure={lcp:0,cls:0,longTasks:[],lcpElement:''};
      new PerformanceObserver(list=>{for(const e of list.getEntries()){window.__measure.lcp=e.startTime;window.__measure.lcpElement=e.element?.outerHTML?.slice(0,300)||''}}).observe({type:'largest-contentful-paint',buffered:true});
      let start=0,last=0,value=0;new PerformanceObserver(list=>{for(const e of list.getEntries()){if(e.hadRecentInput)continue;if(e.startTime-last>1000||e.startTime-start>5000){start=e.startTime;value=0}value+=e.value;last=e.startTime;window.__measure.cls=Math.max(window.__measure.cls,value)}}).observe({type:'layout-shift',buffered:true});
      new PerformanceObserver(list=>{window.__measure.longTasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})))}).observe({type:'longtask',buffered:true});
    });
    await page.goto(origin+path);await page.waitForTimeout(8000);
    const data=await page.evaluate(()=>({ ...window.__measure, fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,resources:performance.getEntriesByType('resource').map(e=>({name:new URL(e.name).pathname,transferSize:e.transferSize,duration:e.duration})),navigation:performance.getEntriesByType('navigation')[0]?.toJSON()}));
    const item={name,browser:browser.version(),recordedAt:new Date().toISOString(),method:'Cold cache, CDP applied network/CPU throttling; observed initial navigation plus 8 seconds. Not Lighthouse.',viewport:mobile?'390×844':'1440×900',cpuSlowdown:mobile?4:1,networkKbps:mobile?1600:10240,latencyMs:mobile?150:40,LCP_ms:data.lcp,CLS:data.cls,FCP_ms:data.fcp,blockingTimeObserved_ms:data.longTasks.filter(e=>e.start>=data.fcp).reduce((n,e)=>n+Math.max(0,e.duration-50),0),...data};
    results.push(item);console.log(JSON.stringify({name,LCP_ms:item.LCP_ms,CLS:item.CLS,FCP_ms:item.FCP_ms,blockingTimeObserved_ms:item.blockingTimeObserved_ms,lcpElement:item.lcpElement}));await context.close();
  }
  await mkdir('audit-results',{recursive:true});await writeFile('audit-results/browser-performance.json',JSON.stringify(results,null,2));
}finally{if(browser)await browser.close();server.kill()}
