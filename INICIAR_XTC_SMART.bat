@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo No se encontro Node.js. Instala Node.js LTS y vuelve a iniciar.
  pause
  exit /b 1
)
if not exist "dist\index.html" (
  call npm ci
  if errorlevel 1 exit /b 1
  call npm run build
  if errorlevel 1 exit /b 1
)
node servidor-local.cjs
if errorlevel 1 pause
