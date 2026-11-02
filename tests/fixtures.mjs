import {PNG} from 'pngjs';
import {zipSync,strToU8} from 'fflate';
export function image(width,height,kind){
 const png=new PNG({width,height});
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const i=(y*width+x)*4;
  const margin=x<12||x>=width-12||y<12||y>=height-12;
  const gutter=Math.abs(y-height/3)<10||Math.abs(y-height*2/3)<10||Math.abs(x-width/2)<8;
  const edge=x%97<3||y%83<3;
  const gray=margin||gutter?255:edge?0:Math.round((x*13+y*7)%256);
  png.data[i]=kind==='color'&&!margin&&!gutter?(x*5)%256:gray;
  png.data[i+1]=kind==='color'&&!margin&&!gutter?(y*3)%256:gray;
  png.data[i+2]=kind==='color'&&!margin&&!gutter?(x+y)%256:gray;
  png.data[i+3]=255;
 }
 return PNG.sync.write(png);
}
export function cbz(){
 const pages=[['001.png',480,800,'gray'],['002.png',900,500,'color'],['003.png',400,1400,'gray'],['004.png',128,192,'gray']];
 const files=Object.fromEntries(pages.map(([name,w,h,k])=>[name,image(w,h,k)]));
 files['ComicInfo.xml']=strToU8('<ComicInfo><Title>Recovery Test</Title><Writer>Synthetic fixture</Writer><Summary>Generated patterns, no manga content</Summary></ComicInfo>');
 return Buffer.from(zipSync(files));
}
function crc32(bytes){let crc=0xffffffff;for(const byte of bytes){crc^=byte;for(let bit=0;bit<8;bit++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
export function cbr(){
 // RAR4 stored files; all images are generated here, no external archive fixtures.
 const header=(type,flags,tail)=>{const b=Buffer.alloc(7+tail.length);b[2]=type;b.writeUInt16LE(flags,3);b.writeUInt16LE(b.length,5);tail.copy(b,7);b.writeUInt16LE(crc32(b.subarray(2))&65535,0);return b;};
 const buffers=[Buffer.from([0x52,0x61,0x72,0x21,0x1a,0x07,0]),header(0x73,0,Buffer.alloc(6))];
 for(const [name,w,h,kind]of [['001.png',480,800,'gray'],['002.png',900,500,'color']]){
  const data=image(w,h,kind),filename=Buffer.from(name),tail=Buffer.alloc(25+filename.length);
  tail.writeUInt32LE(data.length,0);tail.writeUInt32LE(data.length,4);tail[8]=2;tail.writeUInt32LE(crc32(data),9);
  tail[17]=20;tail[18]=0x30;tail.writeUInt16LE(filename.length,19);tail.writeUInt32LE(0x20,21);filename.copy(tail,25);
  buffers.push(header(0x74,0x8000,tail),data);
 }
 buffers.push(header(0x7b,0,Buffer.alloc(0)));return Buffer.concat(buffers);
}
export function pdf(){
 const objects=[];objects.push('<< /Type /Catalog /Pages 2 0 R >>');objects.push('<< /Type /Pages /Kids [4 0 R 6 0 R 8 0 R] /Count 3 >>');objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
 for(const [w,h,label]of [[480,800,'Portrait'],[900,500,'Landscape'],[400,1400,'Tall']]){
  const contentId=objects.length+2;
  objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentId} 0 R >>`);
  const content=`q 1 g 0 0 ${w} ${h} re f 0.3 g 20 20 ${w-40} ${h/3-30} re f 0 g 20 ${h/3+20} ${w-40} ${h/3-30} re f 0.8 g 20 ${h*2/3+20} ${w-40} ${h/3-40} re f Q BT /F1 20 Tf 30 ${h-50} Td (${label} recovery test) Tj ET`;
  objects.push(`<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`);
 }
 let text='%PDF-1.4\n',offsets=[0];for(let i=0;i<objects.length;i++){offsets.push(Buffer.byteLength(text));text+=`${i+1} 0 obj\n${objects[i]}\nendobj\n`;}
 const start=Buffer.byteLength(text);text+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
 for(const offset of offsets.slice(1))text+=String(offset).padStart(10,'0')+' 00000 n \n';
 text+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF\n`;return Buffer.from(text);
}
