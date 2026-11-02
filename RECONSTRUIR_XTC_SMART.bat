@echo off
setlocal
cd /d "%~dp0"
call npm ci
if errorlevel 1 goto :error
call npm run build
if errorlevel 1 goto :error
echo Aplicacion reconstruida desde src y wasm-src.
echo Ejecuta INICIAR_XTC_SMART.bat para abrirla.
pause
exit /b 0
:error
echo No se pudo reconstruir. Revisa el error mostrado arriba.
pause
exit /b 1
