# Alcance y evidencia de recuperación

La fuente de verdad es la copia funcional xtcjsapp-smart-local conservada por el usuario. xtcjsapp-main se utilizó como referencia de origen y nombres. Las otras bases no sustituyen la implementación personal.

## Inventario

- 24 recursos originales: 19 archivos de texto y 5 binarios.
- Los 19 archivos de texto se recuperaron en src con formato legible.
- Los 3 WebAssembly se recuperaron en WAT y se reconstruyen byte por byte, incluidas secciones auxiliares.
- Los otros 2 binarios son los iconos PNG originales.
- Se preservan módulos, workers, estilos, HTML e import map.
- Se guarda la base proporcionada: 68 archivos de TypeScript, AssemblyScript, configuración y documentación en reference/xtcjsapp-main-source.zip.

tests/reference/original-dist.zip contiene únicamente los recursos originales de la aplicación, sin mangas. manifest.json conserva sus SHA-256. Esta referencia procede de la carpeta original del usuario, no de dist regenerado. Las capturas y archivos de mangas de otras carpetas no se incorporan.

## Verificación

npm test construye desde src y wasm-src y ejecuta:

1. Integridad de los 24 recursos originales por nombre, tamaño y SHA-256.
2. Comparación sintáctica de todos los JavaScript con el original formateado, normalizando identificadores ligados y conservando nombres públicos, propiedades y referencias globales.
3. Conservación de HTML, CSS, SVG y binarios; correspondencia entre fuentes y dist.
4. Recompilación de los tres WAT y comparación exacta con los WebAssembly originales.
5. Navegador real: carga, conversión, descarga y visor de salida.
6. Galería: dimensiones, estiramiento/restauración, giro, bloqueo, exclusión y nueva conversión.
7. Comparación binaria de original y recuperación para CBZ, CBR, PDF, XTC, XTCH, perfiles de pantalla, división, orientación, filtros, tramas y ajustes por página.
8. Archivos vacíos, exclusión total y cancelación antes de convertir.
9. Fusión y división de CBZ, CBR, PDF, XTC y XTCH; rangos y conteos.
10. Inspección independiente de cabeceras, índices, dimensiones, tamaños y límites de datos XTC/XTCH.

Las imágenes, PDF y RAR de prueba se generan por código. No contienen mangas ni datos privados. Se fija la fecha del navegador y la semilla aleatoria para comparar resultados reproducibles; no se ignoran diferencias de píxeles ni de bytes de los XTC.

La última ejecución genera .test-results/browser-report.json. Los informes publicados se guardan en docs/validation.

## Límites de la afirmación

No se recuperan exactamente los comentarios, tipos, nombres ni estructura que el compilador eliminó y que no quedaron en mapas de código. Se conserva la implementación ejecutable de la copia, pero no se reproduce textualmente el repositorio personal perdido.

La auditoría estática y la igualdad binaria de WASM verifican la conservación del código. Las pruebas de navegador verifican comportamientos concretos, sin garantizar ausencia de defectos para toda entrada, función futura, navegador o firmware. No se ha probado un dispositivo Xteink físico desde este entorno.
