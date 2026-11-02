import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {loadOriginal} from './reference/load-original.mjs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const mime={'.js':'text/javascript','.mjs':'text/javascript','.html':'text/html','.css':'text/css','.wasm':'application/wasm','.svg':'image/svg+xml','.png':'image/png'};
export async function serve(reference=false){
 const archive=reference?await loadOriginal():null;
 const server=http.createServer(async(req,res)=>{
  try{
   let rel=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';
   if(rel.includes('..')){res.writeHead(403).end();return;}
   let data;
   try{data=archive?archive[rel]:await fs.readFile(path.join(root,'dist',rel));}catch{}
   if(!data&&!path.extname(rel)){rel='index.html';data=archive?archive[rel]:await fs.readFile(path.join(root,'dist',rel));}
   if(!data){res.writeHead(404).end();return;}
   // Test-only access to the same conversion entry point used by the UI.
   if(rel==='assets/index-DvBpcHQQ.js')data=Buffer.concat([Buffer.from(data),Buffer.from(`\nexport {${reference?'_a':'convertToXtc'} as recoveryConvert, za as recoveryDefaults};\n`)]);
   if(rel==='assets/merge-B1dbry_4.js')data=Buffer.concat([Buffer.from(data),Buffer.from(reference?'\nexport {Ae as recoveryMerge,fe as recoverySplit,le as recoveryRanges,qe as recoveryParts,ue as recoveryCount};\n':'\nexport {mergeFiles as recoveryMerge,splitFile as recoverySplit,parsePageRanges as recoveryRanges,calculateEqualParts as recoveryParts,getPageCount as recoveryCount};\n')]);
   res.writeHead(200,{'Content-Type':mime[path.extname(rel)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  }catch(error){res.writeHead(500).end(error.message);}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 return {url:`http://127.0.0.1:${server.address().port}`,close:()=>new Promise(resolve=>server.close(resolve))};
}
