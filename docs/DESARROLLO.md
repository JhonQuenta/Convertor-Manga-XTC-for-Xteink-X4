# Desarrollo del código recuperado

El programa usa módulos ESM del navegador. El build conserva las rutas de la copia original para evitar cambios en importaciones, workers y precargas. Los sufijos de los archivos son históricos y no se recalculan al editar. El servidor responde con Cache-Control: no-cache.

| Archivo | Responsabilidad |
| --- | --- |
| src/assets/index-DvBpcHQQ.js | ConverterPage, PageGallery, LivePreview, convertToXtc, convertCbzToXtc, convertCbrToXtc, convertPdfToXtc, processCanvasAsImage, filtros y divisiones propias. |
| src/assets/unrar-D2pV8Jg8.js | MangaOptions, ReaderOrientationControl, ToneSliders, ResultViewer, geometría, lienzos, lectura/escritura XTC y acceso a WASM. |
| src/assets/merge-B1dbry_4.js | mergeFiles, splitFile, parsePageRanges, calculateEqualParts y MergePage. |
| src/assets/index-BmvbC-N2.js | Inicio de React, rutas, marco general y dependencias agrupadas por el build antiguo. |
| src/assets/index-BIMJi7s1.css | Estilos. |
| src/index.html | Entrada e import map del redimensionador. |
| src/assets/lz4-compress.worker-XT8rk-9d.js | Compresión en worker. |
| src/assets/resize/ | Redimensionador y worker. |
| src/assets/react-vendor-*, pdf-*, zipjs-*, unrar-BE6MZCHv.js, src/pdf.worker.min.mjs | Dependencias recuperadas, ya incluidas para ejecución local. |
| wasm-src/ | Código WAT de los motores de imagen, RAR y redimensionamiento. |
| public/ | Iconos originales. El build genera los WASM desde WAT; los binarios compilados no se publican. |
| scripts/ | Construcción reproducible de dist. |
| tests/ | Fixtures sintéticas, integridad y regresión contra la aplicación original. |
| reference/xtcjsapp-main-source.zip | TypeScript y AssemblyScript de la base proporcionada: referencia, sin las mejoras posteriores. |

## Cambios futuros

1. Cambia el módulo correspondiente en src. Puedes crear módulos nuevos con nombres descriptivos y extensión .js.
2. Añade pruebas del comportamiento nuevo y del existente que afecte.
3. Ejecuta npm run build y npm test. Recarga la página para verificar el resultado.
4. Revisa la salida en la comparación y, para cambios de imagen o formato, en el lector físico.

La configuración inicial está en ConverterPage; za contiene la preparación compartida. Los ajustes por página tienen prioridad sobre los generales. Conserva la prioridad de candados, exclusiones, portada y giros.

Las pruebas de integridad comparan el árbol sintáctico con la copia original, normalizando nombres de variables. Una modificación funcional legítima puede hacer fallar esta auditoría. No borres la referencia original para hacer pasar el test: conserva la auditoría como evidencia de recuperación y añade expectativas explícitas del cambio. La comparación binaria de salidas también detecta cambios intencionales: documenta y actualiza solo las expectativas correspondientes.

## Origen y nombres

function-matches.json registra 75 coincidencias estructurales. additional-identifiers.json registra 87 nombres adicionales asignados por similitud o revisión manual; no afirma que esas implementaciones sean idénticas a la base. Los cuerpos de las funciones personales se conservaron desde la copia funcional.

El código conserva parte de los identificadores compactos y no recupera los límites originales de módulos ni todas las anotaciones de tipos. Una migración a TypeScript/TSX debe realizarse por etapas con estas pruebas como control.

## WebAssembly

wasm-src/xtc.wat es el motor exacto conservado, en una representación textual de bajo nivel. El AssemblyScript de la base se guarda como referencia; su binario es diferente y no se usa para sustituir el motor personal.

WABT reconstruye los tres motores. metadata.json preserva secciones auxiliares; el número de segmentos de datos se calcula al construir. wasm.test.mjs compara cada resultado byte por byte. Esto no equivale a recuperar el AssemblyScript original exacto.

No sustituyas src por el ZIP de la base: perderías las mejoras personales.
