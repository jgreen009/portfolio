import {chromium} from '@playwright/test';
import {readFile,mkdir} from 'node:fs/promises';
import sharp from 'sharp';
import {projects} from '../src/content.mjs';

// Entirely local: installed fonts, CSS, and original system marks.
const font=await readFile('node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2');
await mkdir('public/og',{recursive:true});await mkdir('public/icons',{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||'msedge'});
try {
  const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  for(const item of [{slug:'portfolio',name:'Intelligent products.\nUseful automation.'},...projects]){
    await page.setContent(`<style>@font-face{font-family:Display;src:url(data:font/woff2;base64,${font.toString('base64')})}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#101114;color:#f0eee8;font-family:Display,Arial;padding:64px;background-image:linear-gradient(#ffffff06 1px,transparent 1px),linear-gradient(90deg,#ffffff06 1px,transparent 1px);background-size:48px 48px}header{display:flex;justify-content:space-between;align-items:center;font-size:28px}small{font-size:15px;letter-spacing:2px;color:#a7b7fa}h1{font-size:76px;line-height:1.06;letter-spacing:-4px;max-width:960px;margin:76px 0 36px;white-space:pre-line}footer{position:absolute;bottom:58px;font-size:20px;color:#b7b9c4}.mark{display:flex;gap:12px}.mark i{display:block;width:34px;height:34px;border:1px solid #788afa;border-radius:7px}.mark i:nth-child(2){background:#5365ed}.mark i:nth-child(3){background:#8170da}</style><header><span>michael<span style="color:#8f9bff">®</span></span><div class="mark"><i></i><i></i><i></i></div></header><h1>${item.name}</h1><footer>AI Developer & Automation Expert <span style="color:#7387ff">/</span> Visual Web Designer</footer>`);
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:`public/og/${item.slug}.png`});
  }
} finally {await browser.close()}
const icon=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="100" fill="#101114"/><path d="M100 370V162h62v24c26-39 81-38 110 1 39-45 131-35 131 43v140h-65V244c0-41-51-40-51 0v126h-65V244c0-41-57-40-57 0v126Z" fill="#f0eee8"/><circle cx="413" cy="110" r="22" fill="#7387ff"/></svg>');
for(const [name,size] of [['icon-192',192],['apple-touch-icon',180]])await sharp(icon).resize(size,size).png().toFile(`public/icons/${name}.png`);
console.log(`Generated ${projects.length+1} 1200×630 share images and two icons using local assets.`);
