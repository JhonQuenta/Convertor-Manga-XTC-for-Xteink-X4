import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {serve} from './server.mjs';
import {cbz,pdf} from './fixtures.mjs';
const server=await serve();
const report={scenarios:[],externalOrigins:[],nonLocalRequests:0};
const browser=await chromium.launch({channel:process.env.TEST_BROWSER_CHANNEL||'chrome',headless:true});
try{
 const context=await browser.newContext();
 context.on('request',request=>{
  const url=new URL(request.url());
  if(['http:','https:'].includes(url.protocol)&&url.origin!==server.url){
   report.nonLocalRequests++;
   if(!report.externalOrigins.includes(url.origin))report.externalOrigins.push(url.origin);
  }
 });
 for(const [name,data]of [['privacy.cbz',cbz()],['privacy.pdf',pdf()]]){
  const page=await context.newPage();
  await page.goto(server.url+'/?local=1');
  await page.locator('input[type=file]').setInputFiles({name,mimeType:'application/octet-stream',buffer:data});
  await page.getByRole('button',{name:'Convertir',exact:true}).click();
  await page.getByRole('heading',{name:'Archivos listos'}).waitFor({timeout:30000});
  const download=page.waitForEvent('download',{timeout:15000});
  await page.getByRole('button',{name:'Descargar',exact:true}).click();
  assert.ok((await download).suggestedFilename().endsWith('.xtc'));
  await page.close();report.scenarios.push(name.split('.').at(-1));
 }
 assert.equal(report.nonLocalRequests,0,'conversion and download must not contact external origins');
 console.log('PASS privacy: CBZ and PDF conversion/download contact only the local server');
}finally{
 await fs.mkdir(new URL('../.test-results/',import.meta.url),{recursive:true});
 await fs.writeFile(new URL('../.test-results/privacy-report.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
 await browser.close();await server.close();
}
