@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo No se encontro Node.js. Instala Node.js LTS y vuelve a iniciar.
  pause
  exit /b 1
)
node servidor-local.cjs
if errorlevel 1 pause
