# Manga X4 · Conversor local CBZ a XTC

Convierte manga **CBZ, CBR y PDF a XTC/XTCH** para Xteink X4, con interfaz en español y procesamiento local.

Publica **JavaScript editable recuperado de la copia conservada**, junto con código WAT para reconstruir los tres motores WebAssembly. Las mejoras personales se conservan desde esa copia; el proyecto base no las sustituye. La versión actual del repositorio no incluye el resultado compilado.

## Usar el conversor

1. Instala Node.js 24 o posterior desde [nodejs.org](https://nodejs.org/).
2. Descarga el repositorio con **Code → Download ZIP** y extrae todos los archivos.
3. Abre **INICIAR_XTC_SMART.bat**: la primera vez instalará las dependencias y construirá la aplicación.
4. El navegador abrirá **http://127.0.0.1:4173/?local=1**.
5. Carga tu manga, revisa las páginas y pulsa **Convertir**. Después pulsa **Descargar**.

Mantén abierta la consola. Al cerrarla se detiene el servidor. La primera construcción necesita conexión para instalar dependencias; las conversiones se realizan localmente.

## Desarrollar

```sh
npm ci
npm run build
npm test
npm start
```

Las pruebas usan Google Chrome instalado. En otros equipos, ejecuta `npx playwright install chromium` y configura `TEST_BROWSER_CHANNEL=chromium`. En PowerShell: `$env:TEST_BROWSER_CHANNEL='chromium'`.

`RECONSTRUIR_XTC_SMART.bat` instala las dependencias de desarrollo y reconstruye la aplicación. Edita **src/** y **wasm-src/**; **dist/** es el resultado generado y no se publica en Git.

Lee [DESARROLLO.md](docs/DESARROLLO.md) para encontrar las funciones y [RECUPERACION.md](docs/RECUPERACION.md) para revisar el alcance y las pruebas.

## Funciones

- XTC de 1 bit y XTCH de cuatro tonos.
- Perfiles X4 / Classic V2, X3 y X4 Pro.
- Recorte, división automática, viñetas y acercamientos.
- Galería con giro, bloqueo, exclusión, estiramiento y tonos por página.
- Comparación del original con el resultado y visor de salida.
- Fusión y división de CBZ, CBR, PDF, XTC y XTCH.

Consulta [SMART_MANGA_LOCAL.md](SMART_MANGA_LOCAL.md) para el uso detallado. Es la guía histórica: algunas referencias a la antigua carpeta de desarrollo ya no se aplican.

## Alcance de la recuperación

Se recuperaron las fuentes de los 24 recursos de la copia disponible. El JavaScript se recuperó con formato legible; los tres WebAssembly se reconstruyen desde WAT byte por byte. El código TypeScript de la base proporcionada se guarda en [reference/](reference/) para consulta.

Las pruebas consultan el commit original inmutable del historial de Git. Al descargar un ZIP sin historial, descargan esa misma referencia pública solo para las pruebas. No se incluye una copia compilada dentro de las fuentes.

No es una restauración textual exacta de los TypeScript/TSX personales perdidos: la compilación eliminó comentarios, tipos, nombres y los límites de módulos. Las pruebas verifican la recuperación y los casos incluidos; no garantizan ausencia de errores en cualquier función futura.

## Licencia

Se conserva la [licencia MIT original](LICENSE), copyright © 2026 varo6, y los avisos incluidos en las dependencias.
