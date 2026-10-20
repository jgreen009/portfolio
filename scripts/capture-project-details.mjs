import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const sites=[
 {slug:'key-tapper',url:'https://rhythm-flash-mastermind.lovable.app/',targets:[]},
 {slug:'rise-hydration',url:'https://risehydration.netlify.app/',targets:[['collection','#story'],['flavors','#flavors']]},
 {slug:'aurelis-estate',url:'https://aurelis-estate.netlify.app/',targets:[['properties','#properties'],['calculator','#calculator']]},
 {slug:'forge-fitness',url:'https://forgefitnesslanding.netlify.app/',targets:[['membership','#membership'],['schedule','#schedule']]},
 {slug:'svip',url:'https://www.svip.news/',targets:[['membership','[aria-label="Membership benefits"]']]},
 {slug:'capy-custom-pc',url:'https://cappy-custom-pc-copy-copy-4a28dc09.base44.app/',targets:[['builds','#rigs'],['gallery','#gallery']]}
];
const browser=await chromium.launch({channel:'msedge'});
try{for(const site of sites){const dir=`audit-results/project-captures/${site.slug}`;await mkdir(dir,{recursive:true});const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});const page=await context.newPage();page.setDefaultTimeout(15000);
 try{await page.goto(site.url,{waitUntil:'domcontentloaded',timeout:45000});await page.waitForFunction(()=>document.body.innerText.trim().length>100,{},{timeout:45000});await page.waitForTimeout(2500);await page.screenshot({path:`${dir}/hero.png`,animations:'disabled',timeout:30000});
 const survey=await page.evaluate(()=>({title:document.title,text:document.body.innerText,buttons:[...document.querySelectorAll('button')].map(el=>({text:el.innerText,label:el.getAttribute('aria-label')})),links:[...document.querySelectorAll('a')].map(el=>({text:el.innerText,href:el.href}))}));await writeFile(`${dir}/detail-survey.json`,JSON.stringify(survey,null,2));console.log(JSON.stringify({slug:site.slug,title:survey.title,text:survey.text.slice(0,1800),buttons:survey.buttons.slice(0,12)}));
 for(const [name,selector]of site.targets){try{const el=page.locator(selector).first();await el.scrollIntoViewIfNeeded();await page.waitForTimeout(1500);await el.screenshot({path:`${dir}/${name}.png`,animations:'disabled',timeout:30000});console.log(`Captured ${site.slug}/${name}`)}catch(e){console.log(`Capture ${site.slug}/${name}: ${e.message.slice(0,120)}`)}}
 if(site.slug==='svip'){await page.getByRole('link',{name:'View All Experience Zones',exact:true}).click();await page.waitForLoadState('domcontentloaded');await page.waitForTimeout(2000);await page.screenshot({path:`${dir}/experience-zones.png`,animations:'disabled',timeout:30000});await writeFile(`${dir}/zones.txt`,await page.locator('body').innerText());}
 if(site.slug==='capy-custom-pc'){await page.goto('https://cappy-custom-pc-copy-copy-4a28dc09.base44.app/allbuilds',{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(2000);await page.screenshot({path:`${dir}/catalog.png`,animations:'disabled',timeout:30000});await writeFile(`${dir}/catalog.txt`,await page.locator('body').innerText());}
 await page.setViewportSize({width:390,height:844});await page.goto(site.url,{waitUntil:'domcontentloaded',timeout:45000});await page.waitForFunction(()=>document.body.innerText.trim().length>100,{},{timeout:30000});await page.waitForTimeout(2000);await page.screenshot({path:`${dir}/mobile.png`,animations:'disabled',timeout:30000});console.log(`Captured ${site.slug}/mobile`);
 }catch(e){console.log(JSON.stringify({slug:site.slug,error:e.message.slice(0,300)}))}finally{await context.close()}}
}finally{await browser.close()}
