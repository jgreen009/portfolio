import {test,expect} from '@playwright/test';
import {projects} from '../src/content.mjs';

test('hero cycles, respects manual selection, pause and offscreen state',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');
 const system=page.locator('.operational-system');await expect(system).toHaveAttribute('data-running','true');await page.clock.install();
 const first=await system.getAttribute('data-active-stage');await page.clock.fastForward(3300);await expect(system).not.toHaveAttribute('data-active-stage',first!);
 await page.getByRole('button',{name:/03 Data/}).click();await page.mouse.move(1,1);await page.locator('.system-stage[aria-pressed=true]').evaluate((e:HTMLElement)=>e.blur());
 await page.clock.fastForward(4000);await expect(system).toHaveAttribute('data-active-stage','2');await expect(system).toHaveAttribute('data-running','false');
 await page.clock.fastForward(4100);await expect(system).toHaveAttribute('data-running','true');
 await page.getByRole('button',{name:'Pause cycle'}).click();const paused=await system.getAttribute('data-active-stage');await page.clock.fastForward(7000);await expect(system).toHaveAttribute('data-active-stage',paused!);
 await page.getByRole('button',{name:'Resume cycle'}).click();await page.mouse.move(1,1);await page.locator('.system-bottom button').evaluate((e:HTMLElement)=>e.blur());await expect(system).toHaveAttribute('data-running','true');
 await page.locator('#services').scrollIntoViewIfNeeded();await expect(system).toHaveAttribute('data-running','false');const offscreen=await system.getAttribute('data-active-stage');await page.clock.fastForward(7000);await expect(system).toHaveAttribute('data-active-stage',offscreen!);
});

test('hidden-document lifecycle suspends the hero timer',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');const system=page.locator('.operational-system');await expect(system).toHaveAttribute('data-running','true');await page.clock.install();
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))});await expect(system).toHaveAttribute('data-running','false');const state=await system.getAttribute('data-active-stage');await page.clock.fastForward(7000);await expect(system).toHaveAttribute('data-active-stage',state!);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'))});await expect(system).toHaveAttribute('data-running','true');
});

test('magnetic button stays bounded, resets immediately and preserves its hit area',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');const link=page.locator('.hero-actions .primary');await link.scrollIntoViewIfNeeded();await page.waitForTimeout(650);const box=(await link.boundingBox())!;
 await page.mouse.move(box.x+box.width-3,box.y+box.height-3);await expect.poll(async()=>link.locator('.action-content').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m41)).toBeGreaterThan(0);
 const value=await link.locator('.action-content').evaluate(e=>{const m=new DOMMatrix(getComputedStyle(e).transform);return {x:m.m41,y:m.m42}});expect(Math.abs(value.x)).toBeLessThanOrEqual(4.1);expect(Math.abs(value.y)).toBeLessThanOrEqual(4.1);expect(await link.boundingBox()).toEqual(box);
 await page.mouse.move(1,1);await expect.poll(async()=>link.locator('.action-content').evaluate(e=>getComputedStyle(e).transform)).toBe('none');await link.click();await expect(page).toHaveURL(/\/contact\/$/);
});

test('reduced motion clears pointer transforms and stops all automatic diagram work',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await expect(page.locator('.operational-system')).toHaveAttribute('data-running','false');const button=page.locator('.hero-actions .primary');await button.hover();expect(await button.locator('.action-content').evaluate(e=>getComputedStyle(e).transform)).toBe('none');
 await page.locator('[data-project="plp-estimate-unifier"]').scrollIntoViewIfNeeded();await expect(page.locator('.concept-playback').first()).toHaveAttribute('data-concept-running','false');await expect(page.locator('.concept-playback').first()).toHaveAttribute('data-concept-step','4');
 await page.goto('/about/');await expect(page.locator('.about-portrait')).toHaveCSS('transform','matrix(1.9, 0, 0, 1.9, 0, 0)');await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/work/');await page.locator('.project').first().scrollIntoViewIfNeeded();await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.project-media').first()).toHaveCSS('clip-path','none');await expect(page.locator('.project-media').first()).toHaveCSS('transform','none');
});

test('touch layout has no magnet or automatic hero playback',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const page=await context.newPage();await page.goto('http://127.0.0.1:5187/');await expect(page.locator('.operational-system')).toHaveAttribute('data-running','false');await page.locator('.hero-actions .primary').tap();await expect(page).toHaveURL(/\/contact\/$/);await context.close();
});

test('workflow reaches each stage using native scrolling',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');for(let i=0;i<6;i++){const stage=page.locator(`[data-workflow-stage="${i}"]`);await stage.scrollIntoViewIfNeeded();await expect(page.locator('.signature-workflow')).toHaveAttribute('data-active-stage',String(i));await expect(stage.getByRole('heading')).toBeVisible()}
 await expect(page.locator('.workflow-output strong')).toHaveText('Test and Launch');await page.setViewportSize({width:390,height:844});await expect(page.locator('.workflow-display')).toBeHidden();
});

test('all screenshots decode, image MIME types are correct, and headshot frame stays square',async({page,request})=>{
 test.setTimeout(90000);await page.emulateMedia({reducedMotion:'reduce'});for(const project of projects){await page.goto(`/work/${project.slug}/`);for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();expect(await img.evaluate(async(i:HTMLImageElement)=>{await i.decode();return i.naturalWidth>0})).toBe(true);const response=await request.get((await img.getAttribute('src'))!);expect(response.headers()['content-type']).toMatch(/^image\//)}}
 for(const width of [360,390,768,1024,1440,1920]){await page.setViewportSize({width,height:1000});await page.goto('/about/');const frame=page.locator('.about-headshot');await frame.scrollIntoViewIfNeeded();const box=(await frame.boundingBox())!;expect(Math.abs(box.width-box.height)).toBeLessThan(1);await page.locator('.about-portrait').evaluate((i:HTMLImageElement)=>i.decode());expect(await page.locator('.about-portrait').evaluate(i=>getComputedStyle(i).transformOrigin)).toBeTruthy()}
});

test('all route content and mobile navigation survive disabled JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();for(const route of ['/','/about/','/contact/','/work/',...projects.map(p=>`/work/${p.slug}/`)]){await page.goto('http://127.0.0.1:5187'+route);await expect(page.locator('h1')).toBeVisible();await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)}await context.close();
});

test('corrected routes, section indicator and active navigation agree',async({page,request})=>{
 for(const slug of ['key-tapper','capy-custom-pc']){await page.goto(`/work/${slug}/`);await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true})).toHaveAttribute('aria-current','page');await page.locator('#capabilities').scrollIntoViewIfNeeded();await expect(page.locator('.case-progress a[href="#capabilities"]')).toHaveAttribute('aria-current','location')}
 for(const slug of ['rhythm-flash','cappy-custom-pc'])expect((await request.get(`/work/${slug}/`)).status()).toBe(404);
});

test('Windows export serves App Router segment prefetch payloads',async({request})=>{for(const path of ['/work/__next.work.__PAGE__.txt','/about/__next.about.__PAGE__.txt','/work/key-tapper/__next.work.$d$slug.__PAGE__.txt']){const response=await request.get(path);expect(response.status()).toBe(200);expect(await response.text()).toContain('"buildId"');expect((await response.text()).trimStart()).not.toMatch(/^<!doctype/i)}});

test('project navigation restores archive scroll on Back and preserves Forward',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1440,height:1000});await page.goto('/work/');const card=page.locator('[data-project="svip"]');await card.scrollIntoViewIfNeeded();const y=await page.evaluate(()=>scrollY);await card.getByRole('link',{name:'View case study'}).click();await expect(page).toHaveURL(/\/work\/svip\/$/);await page.goBack();await expect(page).toHaveURL(/\/work\/$/);await expect.poll(async()=>Math.abs((await page.evaluate(()=>scrollY))-y)).toBeLessThan(100);await page.goForward();await expect(page).toHaveURL(/\/work\/svip\/$/)});
