import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {gzipSync} from 'node:zlib';
const root=resolve('out');
const port=Number(process.argv[process.argv.indexOf('--port')+1])||5180;
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.avif':'image/avif','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const compressed=new Map();
async function respond(req,res,file,status){
  const body=await readFile(file),extension=extname(file);
  const headers={'Content-Type':mime[extension]||'application/octet-stream','X-Content-Type-Options':'nosniff','Vary':'Accept-Encoding'};
  let output=body;
  if(body.length>1024&&['.html','.css','.js','.svg','.xml','.txt'].includes(extension)&&(req.headers['accept-encoding']||'').split(',').some(value=>{const [encoding,quality]=value.trim().split(';');return encoding==='gzip'&&(!quality||Number(quality.trim().replace('q=',''))>0)})){
    const modified=(await stat(file)).mtimeMs;const cached=compressed.get(file);
    output=cached?.modified===modified?cached.body:gzipSync(body);compressed.set(file,{modified,body:output});headers['Content-Encoding']='gzip';
  }
  headers['Content-Length']=String(output.length);res.writeHead(status,headers).end(req.method==='HEAD'?undefined:output);
}
http.createServer(async(req,res)=>{
  try{
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=resolve(root,'.'+path);
    if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return}
    try{await stat(file)}catch(error){
      // Next's Windows static export stores segment payloads in nested folders,
      // while App Router requests the corresponding dot-separated filename.
      const marker=path.lastIndexOf('/__next.');
      if(marker<0||!path.endsWith('.txt'))throw error;
      const parts=path.slice(marker+1,-4).split('.');
      if(parts.length<3)throw error;
      const candidate=resolve(root,'.'+path.slice(0,marker+1),parts.slice(0,2).join('.'),...parts.slice(2,-1),parts.at(-1)+'.txt');
      if(!candidate.startsWith(root+sep))throw error;
      await stat(candidate);file=candidate;
    }
    if((await stat(file)).isDirectory())file=resolve(file,'index.html');await respond(req,res,file,200);
  }catch{try{await respond(req,res,resolve(root,'404.html'),404)}catch{res.writeHead(503).end('Build the portfolio before starting the preview.')}}
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio: http://127.0.0.1:${port}`));
