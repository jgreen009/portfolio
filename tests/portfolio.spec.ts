import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {projects} from '../src/content.mjs';
const routes=['/','/work/','/about/','/contact/',...projects.map(p=>'/work/'+p.slug+'/')];
for(const width of [360,390,768,1024,1440,1920])test(`all routes and overflow at ${width}px`,async({page},testInfo)=>{
  test.setTimeout(90000);
  await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'||/hydration/i.test(m.text()))errors.push(m.text())});
  for(const route of routes){
    await page.goto(route);await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await expect(page.getByText(/editable placeholder/i)).toHaveCount(0);
    await page.screenshot({path:testInfo.outputPath(`${route.replaceAll('/','-')||'home'}.png`),fullPage:true});
  }
  expect(errors).toEqual([]);
});
test('navigation, history, anchors and not found',async({page})=>{
  await page.goto('/');await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true}).click();await expect(page).toHaveURL(/\/work\/$/);
  await page.getByRole('navigation').getByRole('link',{name:'About',exact:true}).click();await expect(page).toHaveURL(/\/about\/$/);
  await page.goBack();await expect(page).toHaveURL(/\/work\/$/);await page.goForward();await expect(page).toHaveURL(/\/about\/$/);
  await page.getByRole('navigation').getByRole('link',{name:'Services',exact:true}).click();await expect(page).toHaveURL(/#services$/);await expect(page.locator('#services')).toBeInViewport();
  const response=await page.goto('/missing-page/');expect(response?.status()).toBe(404);await expect(page.getByRole('heading',{name:'A different direction.'})).toBeVisible();
});
test('mobile menu traps focus, Escape restores focus and links close it',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');
  const menu=page.getByRole('button',{name:'Menu +',exact:true});await menu.click();await expect(page.getByRole('button',{name:'Close −'})).toHaveAttribute('aria-expanded','true');
  await expect(page.getByRole('navigation').getByRole('link',{name:'Work',exact:true})).toBeFocused();
  for(let i=0;i<9;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('header'))).toBe(true)}
  await page.keyboard.press('Escape');await expect(menu).toBeFocused();await menu.click();await page.getByRole('navigation').getByRole('link',{name:'Contact',exact:true}).click();await expect(page).toHaveURL(/\/contact\/$/);await expect(menu).toHaveAttribute('aria-expanded','false');
});
test('verified contact, links and hidden content',async({page})=>{
  await page.goto('/');await expect(page.getByRole('heading',{name:/testimonial/i})).toHaveCount(0);
  for(const name of ['LinkedIn','GitHub','Fiverr','Contra'])await expect(page.getByRole('link',{name,exact:true})).toHaveCount(0);
  await page.goto('/contact/');await expect(page.locator('a[href="mailto:mikkyade345@gmail.com"]').first()).toBeVisible();await expect(page.locator('a[href="tel:+2349023983129"]')).toBeVisible();
  await page.goto('/work/aurelis-estate/');await expect(page.locator('a[href="https://aurelis-estate.netlify.app/"]').first()).toBeVisible();
});
test('brief validation, download, email formatting and stale invalidation',async({page})=>{
  await page.goto('/contact/');await page.getByRole('button',{name:'Prepare project brief'}).click();await expect(page.locator('form').getByRole('alert')).toBeFocused();await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3);
  await page.getByLabel('Your name').fill('Local QA');await page.getByLabel('Email address',{exact:true}).fill('qa@example.test');await page.getByLabel('Tell me about your project').fill('Current request & scope\nSecond line.');
  const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Prepare project brief'}).click();const download=await pending;expect(download.suggestedFilename()).toMatch(/^michael-project-brief-\d{4}-\d{2}-\d{2}\.txt$/);
  const stream=await download.createReadStream();let downloaded='';for await(const chunk of stream!)downloaded+=chunk.toString();expect(downloaded).toContain('Current request & scope\nSecond line.');
  const brief=page.getByLabel('Prepared project brief');await expect(brief).toHaveValue(downloaded);
  const href=await page.getByRole('link',{name:'Open brief in email app'}).getAttribute('href');expect(new URL(href!).searchParams.get('body')).toBe(downloaded);
  await page.getByLabel('Tell me about your project').fill('Updated request');await expect(brief).toHaveCount(0);await expect(page.getByRole('link',{name:'Open brief in email app'})).toHaveCount(0);
});
test('clipboard actions and fallback',async({page,context})=>{
  await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('/contact/');await page.getByRole('button',{name:'Copy email address'}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('mikkyade345@gmail.com');
  await page.getByLabel('Your name').fill('Clipboard QA');await page.getByLabel('Email address',{exact:true}).fill('qa@example.test');await page.getByLabel('Tell me about your project').fill('Copy this brief');await page.getByRole('button',{name:'Prepare project brief'}).click();await page.getByRole('button',{name:'Copy project brief'}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('Copy this brief');
  await page.evaluate(()=>Object.defineProperty(navigator.clipboard,'writeText',{value:()=>Promise.reject(new Error('denied'))}));await page.getByRole('button',{name:'Copy project brief'}).click();await expect(page.getByLabel('Prepared project brief')).toBeFocused();await expect(page.getByText('Copy unavailable. The brief is selected; copy it manually.')).toBeVisible();
});
test('reduced motion keeps hero, workflow and navigation usable',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1440,height:1000});await page.goto('/');
  const active=page.locator('.system-stage[aria-pressed="true"]');const text=await active.innerText();await page.waitForTimeout(5500);expect(await active.innerText()).toBe(text);
  expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await page.getByRole('button',{name:/05 Business outcome/}).click();await expect(active).toContainText('Business outcome');
  await page.locator('[data-workflow-stage="5"]').scrollIntoViewIfNeeded();await expect(page.locator('[data-workflow-stage="5"]')).toBeVisible();
  await page.getByRole('navigation').getByRole('link',{name:'Contact',exact:true}).click();await expect(page.locator('h1')).toBeVisible();
});
for(const width of [390,1440])for(const route of routes)test(`@a11y ${route} ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations).toEqual([]);
});
test('@a11y keyboard disclosures, menu, invalid and prepared form states',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
  expect(await page.getByRole('link',{name:'Skip to content'}).evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe('none');
  const disclosure=page.locator('summary').first();await disclosure.focus();await page.keyboard.press('Enter');await expect(page.locator('details').first()).toHaveAttribute('open','');
  await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Menu +'}).click();expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);await page.keyboard.press('Escape');
  await page.goto('/contact/');await page.getByRole('button',{name:'Prepare project brief'}).click();expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByLabel('Your name').fill('Accessibility QA');await page.getByLabel('Email address',{exact:true}).fill('qa@example.test');await page.getByLabel('Tell me about your project').fill('An accessible project brief.');await page.getByRole('button',{name:'Prepare project brief'}).click();expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
});
test('contact remains local without third-party requests or persistence',async({page,context})=>{
  const external:string[]=[];page.on('request',request=>{if(/^https?:/.test(request.url())&&!request.url().startsWith('http://127.0.0.1:5187/'))external.push(request.url())});
  await page.goto('/contact/');await page.getByLabel('Your name').fill('Privacy QA');await page.getByLabel('Email address',{exact:true}).fill('qa@example.test');await page.getByLabel('Tell me about your project').fill('Private local test');await page.getByRole('button',{name:'Prepare project brief'}).click();await expect(page.getByLabel('Prepared project brief')).toBeVisible();
  expect(external).toEqual([]);expect(await context.cookies()).toEqual([]);expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
});
test('production server negotiates compression and preserves 404 responses',async({request})=>{
  const compressed=await request.get('/',{headers:{'Accept-Encoding':'gzip'}});expect(compressed.status()).toBe(200);expect(compressed.headers()['content-encoding']).toBe('gzip');expect(await compressed.text()).toContain('<h1');
  const plain=await request.get('/',{headers:{'Accept-Encoding':'gzip;q=0'}});expect(plain.headers()['content-encoding']).toBeUndefined();expect(await plain.text()).toBe(await compressed.text());
  const missing=await request.get('/missing-page/');expect(missing.status()).toBe(404);expect(await missing.text()).toContain('PAGE NOT FOUND');
});
