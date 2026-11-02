# Manga X4 · Conversor local CBZ a XTC

Conversor de manga **CBZ, CBR y PDF a XTC/XTCH**, con un perfil para **Xteink X4 (480 × 800)** e interfaz en español.

## Ejecutar en Windows

1. Instala Node.js LTS desde [nodejs.org](https://nodejs.org/).
2. Descarga este repositorio con **Code → Download ZIP** y extrae todos los archivos.
3. Haz doble clic en **INICIAR_XTC_SMART.bat**.
4. Se abrirá el navegador en **http://127.0.0.1:4173/?local=1**.
5. Carga tu manga, selecciona el dispositivo y los ajustes, revisa las páginas y pulsa **Convertir**.

Mantén abierta la consola durante el uso. Al cerrarla se detiene el servidor local. No requiere npm, instalación de dependencias ni compilación.

También puedes iniciarlo desde una terminal en esta carpeta:

```sh
node servidor-local.cjs
```

En otros sistemas abre manualmente la dirección local después de iniciar el servidor.

## Funciones

- Exportación a XTC de 1 bit y XTCH de cuatro niveles de gris.
- Recorte de márgenes, división automática y detección de viñetas.
- Galería con giro, exclusión, bloqueo y ajustes de tonos por página.
- Comparación del original con el resultado y revisión antes de exportar.
- Fusión y división de archivos.
- Perfiles adicionales para X3, Classic V2 y X4 Pro.

Consulta [SMART_MANGA_LOCAL.md](SMART_MANGA_LOCAL.md) para los ajustes, el flujo de lectura y las limitaciones.

## Procesamiento local

El servidor escucha únicamente en 127.0.0.1. La conversión se realiza en el navegador y el servidor incluido solo sirve los archivos de la aplicación. No incluye mangas ni archivos de ejemplo.

## Contenido de esta publicación

Esta es la **versión compilada lista para ejecutar** que se conservaba del proyecto. Incluye `dist/`, el servidor local, el iniciador de Windows y la documentación.

El código fuente de desarrollo y su configuración de compilación no estaban en la carpeta original disponible. Por eso esta publicación no incluye una orden para reconstruir la aplicación. La guía original contiene referencias históricas al código de desarrollo y al BAT de reconstrucción que no se distribuyen aquí.

## Licencia

Se conserva la [licencia MIT original](LICENSE), copyright © 2026 varo6.

