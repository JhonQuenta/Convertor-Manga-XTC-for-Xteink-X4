import fs from 'node:fs/promises';
import path from 'node:path';
import wabtFactory from 'wabt';
export function splitSections(bytes){
 let at=8;const sections=[];
 const leb=()=>{let value=0,shift=0,b;do{b=bytes[at++];value|=(b&127)<<shift;shift+=7;}while(b&128);return value;};
 while(at<bytes.length){const start=at,id=bytes[at++],length=leb(),body=bytes.subarray(at,at+length);at+=length;sections.push({id,body,raw:bytes.subarray(start,at)});}
 return sections;
}
function leb(value){const bytes=[];do{let b=value&127;value>>>=7;if(value)b|=128;bytes.push(b);}while(value);return Buffer.from(bytes);}
export async function buildWasm(root){
 const wabt=await wabtFactory();
 const metadata=JSON.parse(await fs.readFile(path.join(root,'wasm-src/metadata.json'),'utf8'));
 const output=new Map();
 for(const item of metadata){
  const module=wabt.parseWat(item.file,await fs.readFile(path.join(root,'wasm-src',item.file.replace(/\.wasm$/,'.wat')),'utf8'));
  module.validate();
  const {buffer}=module.toBinary({canonicalize_lebs:true,write_debug_names:false});module.destroy();
  const sections=splitSections(Buffer.from(buffer));
  if(item.dataCount){
   const data=sections.find(s=>s.id===11);
   let count=0,shift=0;if(data)for(const b of data.body){count|=(b&127)<<shift;shift+=7;if(!(b&128))break;}
   const body=leb(count),raw=Buffer.concat([Buffer.from([12]),leb(body.length),body]);
   const at=sections.findIndex(s=>s.id===10);sections.splice(at,0,{id:12,raw});
  }
  for(const raw of item.customSections)sections.push({id:0,raw:Buffer.from(raw,'base64')});
  const rebuilt=Buffer.concat([Buffer.from(buffer.subarray(0,8)),...sections.map(s=>s.raw)]);
  await WebAssembly.compile(rebuilt);
  output.set(item.file,rebuilt);
 }
 return output;
}
