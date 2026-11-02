import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {buildWasm} from './wasm.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
// The recovered modules are native ESM. No rebundling or minification is needed.
// Build into a temporary directory so a failed copy never destroys the runnable copy.
const staging = path.join(root, '.build-staging');
await fs.rm(staging, {recursive:true, force:true});
await fs.mkdir(staging, {recursive:true});
await fs.cp(path.join(root,'public'),staging,{recursive:true,filter:file=>!file.endsWith('.wasm')});
await fs.cp(path.join(root,'src'),staging,{recursive:true});
for(const [file,data] of await buildWasm(root)){
 const destination=path.join(staging,file);
 await fs.mkdir(path.dirname(destination),{recursive:true});
 await fs.writeFile(destination,data);
}
await fs.access(path.join(staging,'index.html'));
await fs.rm(path.join(root,'dist'),{recursive:true,force:true});
await fs.rename(staging,path.join(root,'dist'));
console.log('Built editable sources and binary assets into dist/.');
