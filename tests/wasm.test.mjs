import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {loadOriginal} from './reference/load-original.mjs';
import {buildWasm} from '../scripts/wasm.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
test('all three WAT sources rebuild the exact original binaries, including section metadata',async()=>{
 const reference=await loadOriginal();
 const built=await buildWasm(root);
 assert.equal(built.size,3);
 for(const [file,bytes]of built){
  assert.deepEqual(bytes,Buffer.from(reference[file]),file);
  assert.deepEqual(bytes,await fs.readFile(new URL('../dist/'+file,import.meta.url)),file);
 }
});
