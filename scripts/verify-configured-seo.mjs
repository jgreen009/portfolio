import {spawnSync} from 'node:child_process';
import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {projects} from '../src/content.mjs';
// Reserved .test origin is a fixture only; never a deployment suggestion.
const origin='https://portfolio.example.test';
function build(env){const result=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build'],{env,stdio:'inherit'});if(result.status!==0)throw new Error('SEO fixture build failed')}
try{
  build({...process.env,NEXT_PUBLIC_SITE_URL:origin});
  for(const route of ['', 'work/','about/','contact/',...projects.map(p=>`work/${p.slug}/`)]){
    const html=await readFile(`out/${route}index.html`,'utf8');assert.ok(html.includes(`rel="canonical" href="${origin}/${route}"`),route);
    const image=html.match(/property="og:image" content="([^"]+)"/)?.[1];assert.ok(image?.startsWith(origin+'/og/'));await access('out'+new URL(image).pathname);
    assert.ok(html.includes('name="twitter:image"'));assert.ok(!html.includes('http://localhost'));
    const schemas=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(([,json])=>JSON.parse(json));
    assert.ok(schemas.some(s=>s['@type']==='WebSite'));if(route)assert.ok(schemas.some(s=>s['@type']==='BreadcrumbList'));
  }
  assert.equal((await readFile('out/sitemap.xml','utf8')).match(/<loc>/g)?.length,projects.length+4);
  assert.ok((await readFile('out/robots.txt','utf8')).includes(`Sitemap: ${origin}/sitemap.xml`));
  console.log('Configured-origin SEO fixture: all configured routes passed.');
}finally{
  const env={...process.env};delete env.NEXT_PUBLIC_SITE_URL;build(env);
  console.log('Restored local noindex export.');
}
