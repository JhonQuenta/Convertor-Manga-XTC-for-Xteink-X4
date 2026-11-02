// Static loopback-only server: no npm, Vite or compilation at launch.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');
const root = path.resolve(__dirname, 'dist');
const port = Number(process.env.XTC_PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.wasm': 'application/wasm', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2' };
if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('Falta la web compilada (dist). Ejecuta RECONSTRUIR_XTC_SMART.bat.');
  process.exit(1);
}
const server = http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end(); return; }
  let file = path.resolve(root, '.' + urlPath);
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    if (path.extname(urlPath)) { res.writeHead(404); res.end('Archivo no encontrado'); return; }
    file = path.join(root, 'index.html');
  }
  const real = fs.realpathSync(file);
  if (!real.startsWith(fs.realpathSync(root) + path.sep)) { res.writeHead(403); res.end(); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': fs.statSync(file).size, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
  if (req.method === 'HEAD') { res.end(); return; }
  const stream = fs.createReadStream(file);
  stream.on('error', () => res.destroy());
  stream.pipe(res);
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? 'El puerto ya esta ocupado. Cierra la consola anterior y vuelve a iniciar.' : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  const url = 'http://127.0.0.1:' + port + '/?local=1';
  console.log('XTC Smart Manga listo: ' + url);
  console.log('No se recompila al iniciar. Cierra esta consola para detenerlo.');
  if (!process.env.XTC_NO_BROWSER && process.platform === 'win32') {
    execFile('powershell.exe', ['-NoProfile', '-WindowStyle', 'Hidden', '-Command', "Start-Process '" + url + "'"], { windowsHide: true }, () => {});
  }
});
