import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {unzipSync} from 'fflate';
import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import prettier from 'prettier';
const root = new URL('../',import.meta.url);
const manifest=JSON.parse(await fs.readFile(new URL('reference/manifest.json',import.meta.url)));
const original=unzipSync(await fs.readFile(new URL('reference/original-dist.zip',import.meta.url)));
function canonicalAst(code){
 const ast=parse(code,{sourceType:'module'}), bindings=new Map(), identifiers=new WeakMap();
 traverse(ast,{Identifier(p){
  const isExport=p.parent.type==='ExportSpecifier'&&p.key==='local';
  if(!(p.isReferencedIdentifier()||p.isBindingIdentifier()||isExport))return;
  // Public names, object keys and non-computed properties are observable contracts.
  if((p.parent.type==='ExportSpecifier'&&p.key==='exported')||
    (p.parent.type==='ImportSpecifier'&&p.key==='imported')||
    (/^(ObjectProperty|ObjectMethod|ClassMethod)$/.test(p.parent.type)&&p.key==='key'&&!p.parent.computed))return;
  const binding=p.scope.getBinding(p.node.name);
  if(binding){
   if(!bindings.has(binding))bindings.set(binding,'binding-'+bindings.size);
   identifiers.set(p.node,bindings.get(binding));
  }
 }});
 const omit=new Set(['start','end','loc','extra','leadingComments','innerComments','trailingComments','comments','errors','tokens','shorthand']);
 function clean(n){
  if(typeof n==='bigint')return {bigint:n.toString()};
  if(n===null||typeof n!=='object')return n;
  if(Array.isArray(n))return n.map(clean);
  const out={};
  for(const k of Object.keys(n).sort())if(!omit.has(k))out[k]=k==='name'&&identifiers.has(n)?identifiers.get(n):clean(n[k]);
  return out;
 }
 return clean(ast.program);
}
function firstDifference(a,b,location='root'){
 if(Object.is(a,b))return null;
 if(typeof a!==typeof b||a===null||b===null||typeof a!=='object')return {location,a,b};
 for(const key of new Set([...Object.keys(a),...Object.keys(b)])){
  const diff=firstDifference(a[key],b[key],location+'.'+key);if(diff)return diff;
 }
 return null;
}
test('immutable reference contains exactly the inventoried 24 original assets',()=>{
 assert.equal(manifest.length,24);
 assert.deepEqual(Object.keys(original).sort(),manifest.map(m=>m.path).sort());
 for(const m of manifest)assert.equal(crypto.createHash('sha256').update(original[m.path]).digest('hex'),m.sha256,m.path);
});
for(const m of manifest)test('preserves original asset: '+m.path,async()=>{
 const current=await fs.readFile(new URL(m.recoveredAs,root));
 if(/\.(js|mjs)$/.test(m.path)){
  const formattedReference=await prettier.format(Buffer.from(original[m.path]).toString(),{parser:'babel',printWidth:100});
  assert.equal(JSON.stringify(firstDifference(canonicalAst(current.toString()),canonicalAst(formattedReference))),'null',m.path);
 }else if(/\.(html|css|svg)$/.test(m.path)){
  const options={parser:m.path.endsWith('.css')?'css':'html',printWidth:100};
  assert.equal(await prettier.format(current.toString(),options),await prettier.format(Buffer.from(original[m.path]).toString(),options));
 }else assert.deepEqual(current,Buffer.from(original[m.path]));
 assert.deepEqual(await fs.readFile(new URL('dist/'+m.path,root)),current,'build must use source '+m.path);
});
