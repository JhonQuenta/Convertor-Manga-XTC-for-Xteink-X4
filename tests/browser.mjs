import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {unzipSync} from 'fflate';
import {serve} from './server.mjs';
import {cbz,cbr,pdf} from './fixtures.mjs';
const input=cbz();
const report={browser:null,tests:[],failures:[]};
const reference=await serve(true),recovered=await serve(false);
let browser;
const baseOptions={splitMode:'smart',automaticStrategy:'proportional',dithering:'floyd',horizontalReading:'landscape',pageTones:{},contrast:0,horizontalMargin:0,verticalMargin:0,orientation:'landscape',landscapeDirection:'cw',is2bit:false,manhwa:false,manhwaOverlap:50,sidewaysOverviews:false,includeOverviews:false,padBlack:false,gamma:1,imageMode:'cover',invert:false,videoFps:1,device:'X4',sourceType:'cbz',useWasm:false,streamedDownload:false,compressXtcz:false,packToXtc:false,landscapeSplit:'rtl',preserveLandscapePages:true,pageLayouts:{}};
const cases=[
 ['default',{}],
 ['no-split',{splitMode:'nosplit',splitHorizontalPages:false}],
 ['XTCH',{is2bit:true}],
 ['X3',{device:'X3'}],
 ['X4-Pro',{device:'X4Pro'}],
 ['legibility',{automaticStrategy:'legibility'}],
 ['panels',{splitMode:'panels-landscape'}],
 ['counterclockwise',{landscapeDirection:'ccw'}],
 ['portrait',{orientation:'portrait'}],
 ['vertical-closeups',{horizontalReading:'portrait'}],
 ['no-crop',{smartCrop:false,removePageNumbers:false}],
 ['no-fill',{splitFit:'contain'}],
 ['tones',{gamma:0.85,contrast:0.35,invert:true}],
 ['page-tones',{pageTones:{1:{gamma:1.2,contrast:0.5},2:{gamma:0.7,contrast:0}}}],
 ['manual-pages',{pageRotations:{2:270,3:180},pageLocks:{1:'portrait',2:'landscape'},excludedPages:{4:true},pageHorizontalStretch:{2:false},pageReadingDirections:{2:'ccw'}}],
 ['page-layouts',{pageLayouts:{1:'landscape',2:'portrait'},keepFirstPagePortrait:false}],
 ['black-padding',{splitFit:'contain',padBlack:true}],
 ['unprotected-cover',{keepFirstPagePortrait:false,enhanceCover:false}],
 ['horizontal-proportions',{pageHorizontalStretch:{2:false}}],
 ['CBR',{inputFormat:'cbr'}],
 ['PDF',{inputFormat:'pdf',sourceType:'pdf',landscapeSplit:'none'}],
 ['PDF-XTCH',{inputFormat:'pdf',sourceType:'pdf',is2bit:true,orientation:'portrait'}],
 ['unfiltered',{cleanHighlights:false,sharpenLines:false,colorContrast:false,cleanColorPages:false,enhanceCover:false}],
 ...['none','atkinson','stucki','zhoufang','ostromoukhov','sierra-lite','ordered','matt-parker','stochastic'].map(dithering=>['dither-'+dithering,{dithering,cleanHighlights:false,sharpenLines:false,colorContrast:false,enhanceCover:false}]),
 ['wasm',{useWasm:true,cleanHighlights:false,sharpenLines:false,colorContrast:false,cleanColorPages:false,enhanceCover:false}],
 ['all-excluded',{excludedPages:{1:true,2:true,3:true,4:true}}],
 ['empty-archive',{empty:true}],
];
function inspectXtc(buffer){
 assert.equal(buffer.toString('ascii',0,3),'XTC');
 const bits=buffer[3]===72?2:1;
 assert.equal(buffer.readUInt16LE(4),1);
 const pages=buffer.readUInt16LE(6),index=Number(buffer.readBigUInt64LE(24)),data=Number(buffer.readBigUInt64LE(32));
 assert.ok(pages>0);assert.equal(data,index+pages*16);
 let end=data;const sizes=[];
 for(let p=0;p<pages;p++){
  const at=index+p*16,offset=Number(buffer.readBigUInt64LE(at)),size=buffer.readUInt32LE(at+8),width=buffer.readUInt16LE(at+12),height=buffer.readUInt16LE(at+14);
  assert.equal(offset,end);assert.ok(width>0&&height>0);
  assert.equal(size,22+(bits===2?Math.ceil(height/8)*width*2:Math.ceil(width/8)*height));
  assert.ok(offset+size<=buffer.length);assert.equal(buffer.toString('ascii',offset,offset+3),bits===2?'XTH':'XTG');
  end=offset+size;sizes.push([width,height]);
 }
 assert.equal(end,buffer.length);return {pages,bits,sizes};
}
async function direct(page,options){
 return await page.evaluate(async({base,overrides,input})=>{
  const m=await import('/assets/index-DvBpcHQQ.js');
  let seed=123456789;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const bytes=Uint8Array.from(atob(input),c=>c.charCodeAt(0));
  const type=overrides.inputFormat||'cbz';
  const file=new File([bytes],'recovery.'+type,{type:type==='pdf'?'application/pdf':'application/octet-stream'});
  const opts={...base,...m.recoveryDefaults,...overrides};delete opts.empty;delete opts.inputFormat;
  try{
   const result=await m.recoveryConvert(file,type,opts,()=>{});
   const data=new Uint8Array(result.data);let binary='';for(let i=0;i<data.length;i+=32768)binary+=String.fromCharCode(...data.subarray(i,i+32768));
   return {name:result.name,pageCount:result.pageCount,data:btoa(binary)};
  }catch(e){return {error:e.message};}
 },{base:baseOptions,overrides:options,input:(options.empty?Buffer.from([80,75,5,6,...new Array(18).fill(0)]):options.inputFormat==='cbr'?cbr():options.inputFormat==='pdf'?pdf():input).toString('base64')});
}
async function archiveOperation(page,operation,format,buffer){
 return await page.evaluate(async({operation,format,input})=>{
  const m=await import('/assets/merge-B1dbry_4.js');
  let seed=123456789;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const file=new File([Uint8Array.from(atob(input),c=>c.charCodeAt(0))],'fixture.'+format);
  const total=await m.recoveryCount(file);
  const range=m.recoveryRanges(`1,2-${total}`,total);
  const parts=m.recoveryParts(total,2);
  const outputFormat=format==='cbr'?'cbz':format==='xtch'?'xtc':format;
  let output=operation==='merge'?[await m.recoveryMerge([file,file],outputFormat,()=>{})]:await m.recoverySplit(file,parts,outputFormat,()=>{});
  const results=[];
  for(const result of output){let binary='';const data=new Uint8Array(result.data);for(let i=0;i<data.length;i+=32768)binary+=String.fromCharCode(...data.subarray(i,i+32768));results.push({name:result.name,count:result.pageCount,data:btoa(binary)});}
  let invalid;try{m.recoveryRanges('0-999999',total);}catch(e){invalid=e.message;}
  return {total,range,parts,invalid,results};
 },{operation,format,input:buffer.toString('base64')});
}
try{
 browser=await chromium.launch({channel:process.env.TEST_BROWSER_CHANNEL||'chrome',headless:true});report.browser=browser.version();
 const contexts=await Promise.all([browser.newContext(),browser.newContext()]);
 const pages=await Promise.all(contexts.map(c=>c.newPage()));
 for(let i=0;i<2;i++){
  await pages[i].clock.setFixedTime(new Date('2026-11-01T12:00:00Z'));
  pages[i].on('pageerror',e=>report.failures.push({type:'pageerror',side:i,message:e.message}));
  await pages[i].goto([reference.url,recovered.url][i]+'/?local=1');
  await pages[i].getByRole('heading').first().waitFor();
 }
 // Real user path, including the download and decoded-page preview.
 const ui=[];
 for(const page of pages){
  await page.locator('input[type=file]').setInputFiles({name:'recovery.cbz',mimeType:'application/zip',buffer:input});
  await page.getByRole('button',{name:'Convertir',exact:true}).click();
  await page.getByRole('heading',{name:'Archivos listos'}).waitFor({timeout:30000});
  assert.ok(!(await page.locator('.result-item').innerText()).includes('Error:'));
  const downloading=page.waitForEvent('download',{timeout:15000});await page.getByRole('button',{name:'Descargar',exact:true}).click();
  const download=await downloading;ui.push(await fs.readFile(await download.path()));
  await page.getByRole('button',{name:'Revisar resultado',exact:true}).click();
  await page.locator('.viewer-container canvas').waitFor();
  await page.waitForFunction(()=>document.querySelector('.viewer-container canvas')?.width===480);
  await page.getByRole('button',{name:'Cerrar vista',exact:true}).click();
 }
 assert.ok(ui[1].equals(ui[0]),'UI download differs');report.tests.push({name:'UI-load-convert-download-preview',...inspectXtc(ui[1]),sha256:crypto.createHash('sha256').update(ui[1]).digest('hex')});
 console.log('PASS UI load, conversion, download and preview');
 const galleryDownloads=[];
 for(const page of pages){
  await page.getByRole('button',{name:'Abrir galería',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Revisar páginas del manga',exact:true});
  await dialog.getByRole('button',{name:'Revisar página 4',exact:true}).waitFor();
  assert.ok((await dialog.innerText()).includes('900×500 px'));
  await dialog.getByRole('button',{name:'Restaurar proporciones página 2',exact:true}).click();
  assert.equal(await dialog.getByRole('button',{name:'Estirar página 2',exact:true}).getAttribute('aria-pressed'),'false');
  await dialog.getByRole('button',{name:'Girar página 2',exact:true}).click();
  await dialog.getByRole('button',{name:'Bloquear página 2',exact:true}).click();
  assert.equal(await dialog.getByRole('button',{name:'Desbloquear página 2',exact:true}).getAttribute('aria-pressed'),'true');
  const card=dialog.locator('.page-planner-card').nth(1);
  const rotationBefore=await card.locator('canvas').getAttribute('data-rotation');
  await dialog.getByRole('button',{name:'Girar Horizontalmente',exact:true}).click();
  assert.equal(await card.locator('canvas').getAttribute('data-rotation'),rotationBefore,'bulk rotation must respect lock');
  await dialog.locator('.page-planner-card').nth(3).getByRole('button',{name:'Excluir',exact:true}).click();
  assert.ok((await dialog.locator('.page-planner-card').nth(3).getAttribute('class')).includes('page-excluded'));
  await dialog.getByRole('button',{name:'Cerrar galería',exact:true}).click();
  await page.getByRole('button',{name:'Convertir',exact:true}).click();
  await page.getByRole('button',{name:'Convertir',exact:true}).waitFor({timeout:30000});
  await page.locator('.result-item').waitFor({timeout:30000});
  const downloading=page.waitForEvent('download',{timeout:15000});await page.locator('.result-item').getByRole('button',{name:'Descargar',exact:true}).click();
  galleryDownloads.push(await fs.readFile(await (await downloading).path()));
  await page.reload();
  await page.locator('.result-item').waitFor({timeout:15000});
  assert.ok((await page.locator('.result-item').innerText()).includes('recovery.xtc'),'stored result survives reload');
 }
 assert.ok(galleryDownloads[0].equals(galleryDownloads[1]),'gallery changes must produce identical output');
 assert.ok(inspectXtc(galleryDownloads[1]).pages<inspectXtc(ui[1]).pages);
 report.tests.push({name:'UI-gallery-rotation-lock-stretch-exclusion',...inspectXtc(galleryDownloads[1])});console.log('PASS UI gallery changes and re-conversion');
 for(const [name,options]of cases){
  const start=Date.now();
  const results=[];for(const page of pages)results.push(await direct(page,options));
  assert.equal(results[1].error,results[0].error,name);
  if(results[0].error){assert.ok(['all-excluded','empty-archive'].includes(name),name+': '+results[0].error);report.tests.push({name,error:results[0].error});}
  else{
   const original=Buffer.from(results[0].data,'base64'),current=Buffer.from(results[1].data,'base64');
   assert.ok(original.equals(current),'output differs: '+name);
   const info=inspectXtc(current);assert.equal(info.pages,results[1].pageCount);
   if(name==='no-split')assert.equal(info.pages,4);
   if(name==='XTCH')assert.equal(info.bits,2);
   report.tests.push({name,...info,bytes:current.length,sha256:crypto.createHash('sha256').update(current).digest('hex'),ms:Date.now()-start});
  }
  console.log('PASS '+name);
 }
 for(const format of ['cbz','cbr','pdf','xtc','xtch']){
  const buffer=format==='cbz'?input:format==='cbr'?cbr():format==='pdf'?pdf():format==='xtc'?ui[0]:Buffer.from((await direct(pages[0],{is2bit:true})).data,'base64');
  for(const operation of ['merge','split']){
   const results=[];for(const page of pages)results.push(await archiveOperation(page,operation,format,buffer));
   assert.equal(results[0].invalid,results[1].invalid);assert.ok(results[0].invalid);
   assert.deepEqual(results[0].parts,results[1].parts);
   assert.equal(results[1].results.length,operation==='merge'?1:2);
   let total=0;
   for(let i=0;i<results[0].results.length;i++){
    const a=results[0].results[i],b=results[1].results[i],original=Buffer.from(a.data,'base64'),current=Buffer.from(b.data,'base64');
    assert.equal(a.count,b.count);total+=b.count;
    if(['cbz','cbr'].includes(format)){
     const ref=unzipSync(original),got=unzipSync(current);
     const keys=Object.keys(got).filter(k=>/\.png$/i.test(k));assert.equal(keys.length,b.count);
     assert.deepEqual(Object.keys(ref).sort(),Object.keys(got).sort());
     for(const key of keys)assert.deepEqual(Buffer.from(got[key]),Buffer.from(ref[key]));
    }else if(format==='pdf'){
     assert.equal(current.toString('ascii',0,4),'%PDF');assert.ok(current.equals(original),'PDF archive operation differs');
    }else{assert.ok(current.equals(original));assert.equal(inspectXtc(current).pages,b.count);}
   }
   assert.equal(total,results[0].total*(operation==='merge'?2:1));
   report.tests.push({name:operation+'-'+format,totalPages:total});console.log('PASS '+operation+'-'+format);
  }
 }
 for(const page of pages){
  const cancellation=await page.evaluate(async({base,input})=>{
   const m=await import('/assets/index-DvBpcHQQ.js'),file=new File([Uint8Array.from(atob(input),c=>c.charCodeAt(0))],'cancel.cbz');
   const controller=new AbortController();controller.abort();
   try{await m.recoveryConvert(file,'cbz',{...base,...m.recoveryDefaults,signal:controller.signal},()=>{});return {cancelled:false};}catch(e){return {cancelled:true,name:e.name};}
  },{base:baseOptions,input:input.toString('base64')});
  assert.deepEqual(cancellation,{cancelled:true,name:'AbortError'});
 }
 report.tests.push({name:'abort-before-conversion'});console.log('PASS abort-before-conversion');
 for(const page of pages){
  const cancellation=await page.evaluate(async({base,input})=>{
   const m=await import('/assets/index-DvBpcHQQ.js'),file=new File([Uint8Array.from(atob(input),c=>c.charCodeAt(0))],'cancel.cbz');
   const controller=new AbortController();let progressCalls=0;
   try{await m.recoveryConvert(file,'cbz',{...base,...m.recoveryDefaults,signal:controller.signal},progress=>{progressCalls++;if(progress>0.05)controller.abort();});return {cancelled:false};}catch(e){return {cancelled:true,name:e.name,progressCalls};}
  },{base:baseOptions,input:input.toString('base64')});
  assert.equal(cancellation.cancelled,true);assert.equal(cancellation.name,'AbortError');assert.ok(cancellation.progressCalls>0);
  const after=await direct(page,{splitMode:'nosplit',splitHorizontalPages:false});assert.ok(!after.error);assert.equal(inspectXtc(Buffer.from(after.data,'base64')).pages,4);
 }
 report.tests.push({name:'abort-during-conversion-and-retry'});console.log('PASS abort-during-conversion-and-retry');
 assert.equal(report.failures.length,0,JSON.stringify(report.failures));
}catch(e){report.failures.push({message:e.message,stack:e.stack});throw e;}
finally{
 await fs.mkdir(new URL('../.test-results/',import.meta.url),{recursive:true});
 await fs.writeFile(new URL('../.test-results/browser-report.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
 await browser?.close();await reference.close();await recovered.close();
}
