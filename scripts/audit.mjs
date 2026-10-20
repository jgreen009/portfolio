let lighthouse,launch;
try{({default:lighthouse}=await import('lighthouse'));({launch}=await import('chrome-launcher'))}catch{console.error('Lighthouse is optional and is not installed. Install it with npm install -D lighthouse when registry access is available, then rerun npm run audit:lighthouse. npm run audit provides direct browser measurements.');process.exit(1)}
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
const port=5188;
// Never audit a pre-existing server by accident.
try{await fetch(`http://127.0.0.1:${port}`);throw new Error(`Port ${port} is already in use`)}catch(error){if(error.message.includes('already in use'))throw error}
const server=spawn(process.execPath,['server.mjs','--port',String(port)],{stdio:'inherit'});
let chrome;
try{
  for(let i=0;i<40;i++){try{await fetch(`http://127.0.0.1:${port}`);break}catch{await new Promise(resolve=>setTimeout(resolve,250))}}
  chrome=await launch({chromePath:process.env.BROWSER_EXECUTABLE||'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',chromeFlags:['--headless','--no-first-run','--disable-extensions']});
  await mkdir('audit-results',{recursive:true});
  const summaries=[];
  for(const [name,path,desktop] of [['home-mobile','/',false],['home-desktop','/',true],['project-mobile','/work/plp-estimate-unifier/',false],['contact-mobile','/contact/',false]]){
    const result=await lighthouse(`http://127.0.0.1:${port}${path}`,{port:chrome.port,output:['json','html'],logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo'],...(desktop?{formFactor:'desktop',screenEmulation:{mobile:false,width:1440,height:900,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1,requestLatencyMs:0,downloadThroughputKbps:0,uploadThroughputKbps:0}}:{})});
    if(!result)throw new Error('Lighthouse returned no result');
    await writeFile(`audit-results/${name}.json`,result.report[0]);await writeFile(`audit-results/${name}.html`,result.report[1]);
    const {lhr}=result;const summary={name,lighthouseVersion:lhr.lighthouseVersion,fetchTime:lhr.fetchTime,scores:Object.fromEntries(Object.entries(lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)])),metrics:Object.fromEntries(['largest-contentful-paint','cumulative-layout-shift','total-blocking-time','first-contentful-paint','speed-index'].map(key=>[key,lhr.audits[key].numericValue])),findings:Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,displayValue:a.displayValue,description:a.description})),warnings:lhr.runWarnings};
    summaries.push(summary);console.log(JSON.stringify(summary));
  }
  await writeFile('audit-results/summary.json',JSON.stringify(summaries,null,2));
}finally{if(chrome)await chrome.kill();server.kill()}
