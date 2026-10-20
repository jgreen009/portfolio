import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access,readdir} from 'node:fs/promises';
import {createBrief,createEmailHref} from '../lib/enquiry.mjs';
import {projects,profile,testimonials} from './content.mjs';
const routes=['','work','about','contact',...projects.map(p=>'work/'+p.slug)];
test('all requested routes have metadata, a single main heading and valid internal links',async()=>{for(const route of routes){const html=await readFile(`out/${route?route+'/':''}index.html`,'utf8');assert.equal((html.match(/<h1[ >]/g)||[]).length,1,route);assert.match(html,/<meta name="description" content="[^"]+"/);assert.match(html,/<main id="main">/);for(const [,href]of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){const file=href.includes('.')?href:href==='/'?'/index.html':href.replace(/\/$/,'')+'/index.html';await access('out'+file)}}});
test('case studies preserve supplied capabilities and contact details',async()=>{assert.equal(profile.email,'mikkyade345@gmail.com');assert.deepEqual(testimonials,[]);for(const p of projects){const html=await readFile('out/work/'+p.slug+'/index.html','utf8');for(const feature of p.features)assert.ok(html.includes(feature));if(['plp-estimate-unifier','production-order-crm'].includes(p.slug))assert.ok(html.includes('CONCEPT PREVIEW'));else assert.ok(html.includes('/projects/'+p.slug+'/'),p.slug);assert.ok(!html.includes('Editable placeholder'))}const contact=await readFile('out/contact/index.html','utf8');assert.ok(contact.includes('This form does not store or send your information.'));assert.ok(contact.includes('mailto:mikkyade345@gmail.com'));assert.ok(contact.includes('tel:+2349023983129'));const home=await readFile('out/index.html','utf8');assert.ok(!home.includes('EDITABLE PLACEHOLDER'))});

test('enquiry download and email use the corrected recipient and preserve user text',()=>{
  const data=new FormData();data.set('name','Local QA');data.set('email','qa@example.test');data.set('message','A & B\nTwo lines + a question?');
  const brief=createBrief(data);assert.ok(brief.includes('To: mikkyade345@gmail.com'));assert.ok(brief.includes('Prepared locally. This brief has not been sent.'));
  const href=createEmailHref(brief);const url=new URL(href);assert.equal(url.pathname,profile.email);assert.equal(url.searchParams.get('body'),brief);assert.equal(url.searchParams.get('subject'),'Project enquiry for Michael');
});

test('incorrect standalone email cannot return in source, docs or export',async()=>{
  const oldAddress=profile.email.slice(3); // Construct the obsolete spelling without retaining it in source.
  const bad=new RegExp(`(?<![a-zA-Z0-9._%+-])${oldAddress.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(?![a-zA-Z0-9._%+-])`);
  async function scan(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(['node_modules','.next','.git','audit-results','test-results','playwright-report'].includes(entry.name))continue;const path=`${dir}/${entry.name}`;if(entry.isDirectory())await scan(path);else if(/\.(md|mjs|tsx?|jsx?|html|json|css|txt)$/.test(path)){assert.ok(!bad.test(await readFile(path,'utf8')),`Obsolete email in ${path}`)}}}
  await scan('.');
});

test('navigation, six workflow stages, and capability groups survive export',async()=>{
  const html=await readFile('out/index.html','utf8');
  for(const href of ['/work/','/#services','/about/','/contact/'])assert.ok(html.includes(`href="${href}"`),href);
  for(const value of ['Discover','Architect','Design','Build','Automate','Test and Launch','Webflow','Framer','n8n','Make','Gumloop','Relay','Retool'])assert.ok(html.includes(value),value);
  assert.ok(html.includes('Pause cycle'));assert.ok(html.includes('data-workflow-stage="5"'));
  const notFound=await readFile('out/404.html','utf8');assert.ok(notFound.includes('PAGE NOT FOUND'));
  const config=await readFile('next.config.ts','utf8');assert.ok(config.includes("output: 'export'"));
});

test('progressive enhancement and reduced-motion safeguards remain in place',async()=>{
  const css=await readFile('app/phase-two.css','utf8');const motion=await readFile('components/motion.tsx','utf8');const system=await readFile('components/systems.tsx','utf8');const nav=await readFile('components/interactive.tsx','utf8');
  assert.ok(css.includes('prefers-reduced-motion:reduce'));assert.ok(css.includes('scroll-behavior:auto'));assert.ok(motion.includes('useReducedMotion'));assert.ok(motion.includes('if(reduced!==false||!visible'));
  assert.ok(system.includes('clearInterval'));assert.ok((await readFile('components/workflow.tsx','utf8')).includes('observer.disconnect'));assert.ok(system.includes('document.hidden'));assert.ok(nav.includes('previousInert'));assert.ok(nav.includes("e.key==='Escape'"));
});


test('local metadata, structured data and share assets are valid',async()=>{
 const titles=new Set(),descriptions=new Set();
 for(const route of routes){const html=await readFile('out/'+(route?route+'/':'')+'index.html','utf8');
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title);titles.add(title);
 descriptions.add(html.match(/<meta name="description" content="([^"]+)"/)?.[1]);
 assert.ok(!html.includes('rel="canonical"'));assert.match(html,/<meta name="robots" content="noindex, nofollow"/);
 assert.ok(!html.includes('fonts.googleapis.com'));assert.ok(!html.includes('fonts.gstatic.com'));
 for(const [,json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)){const data=JSON.parse(json);assert.ok(data['@type']);assert.ok(!json.includes('undefined'));}
 }
 assert.equal(titles.size,routes.length);assert.equal(descriptions.size,routes.length);
 for(const slug of ['portfolio',...projects.map(p=>p.slug)]){const image=await readFile('out/og/'+slug+'.png');assert.equal(image.readUInt32BE(16),1200);assert.equal(image.readUInt32BE(20),630)}
 assert.match(await readFile('out/robots.txt','utf8'),/Disallow: \//);
 assert.ok(!(await readFile('out/sitemap.xml','utf8')).includes('<loc>'));
});

test('site URL requires an approved HTTPS origin',async()=>{
 const {parseSiteUrl}=await import('../lib/site-url.mjs');assert.equal(parseSiteUrl(''),null);
 for(const invalid of ['http://localhost:5180','https://localhost','https://127.0.0.1','https://example.test/path','https://user:pass@example.test'])assert.throws(()=>parseSiteUrl(invalid));
 assert.equal(parseSiteUrl('https://example.test/'),'https://example.test');
});
