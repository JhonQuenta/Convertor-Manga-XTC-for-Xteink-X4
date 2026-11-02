import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
export const originalCommit='0b5ee5ad817ad326cc8b1f8b6e09078fceb6600c';
let cached;
export async function loadOriginal(){
 if(cached)return cached;
 const manifest=JSON.parse(await fs.readFile(new URL('manifest.json',import.meta.url)));
 const assets={};
 for(const entry of manifest){
  try{
   assets[entry.path]=execFileSync('git',['show',originalCommit+':dist/'+entry.path],{cwd:new URL('../../',import.meta.url),maxBuffer:5_000_000,stdio:['ignore','pipe','pipe']});
  }catch{
   // ZIP downloads have no Git history. Fetch only the immutable public test baseline.
   const response=await fetch('https://raw.githubusercontent.com/JhonQuenta/Convertor-Manga-XTC-for-Xteink-X4/'+originalCommit+'/dist/'+entry.path);
   if(!response.ok)throw new Error('Cannot load test baseline '+entry.path+': HTTP '+response.status);
   assets[entry.path]=Buffer.from(await response.arrayBuffer());
  }
 }
 cached=assets;return assets;
}
