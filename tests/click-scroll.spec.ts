import {test,expect} from '@playwright/test';

test('press feedback preserves the target and cancels cleanly',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');
 const link=page.locator('.hero-actions .primary');await expect(link).toBeVisible();await page.waitForTimeout(1000);
 const box=(await link.boundingBox())!;await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();
 await expect.poll(()=>link.locator('.action-content').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).a)).toBeLessThan(.99);
 expect(await link.boundingBox()).toEqual(box);await page.mouse.move(1,1);await page.mouse.up();
 await expect.poll(()=>link.locator('.action-content').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).a)).toBe(1);await expect(page).toHaveURL(/\/$/);
});

test('reading progress follows native scrolling and respects reduced motion',async({page})=>{
 await page.goto('/');const progress=page.locator('.reading-progress');await expect(progress).toBeAttached();
 await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight/2,behavior:'instant'}));
 await expect.poll(()=>progress.evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).a)).toBeGreaterThan(.3);
 await page.emulateMedia({reducedMotion:'reduce'});await expect(progress).toBeHidden();
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

