# XTC Smart Manga (uso local)

Ejecuta `INICIAR_XTC_SMART.bat`. Solo necesitas Node.js instalado: abre directamente la web ya compilada en `http://127.0.0.1:4173`, sin npm, instalación de dependencias ni compilación en cada arranque.

La carpeta de uso diario solo contiene `dist`, el servidor local, los dos archivos BAT, la licencia y este documento. El código y las herramientas de desarrollo quedan separados en `work/xtcjsapp-smart`. `RECONSTRUIR_XTC_SMART.bat` es únicamente para actualizar la web después de editar ese código; no hace falta ejecutarlo para leer o convertir mangas.

## Flujo recomendado para XTEink X4

En la galería, **Estirar horizontales** aplica pantalla completa a todas las páginas originalmente horizontales, salvo excluidas y candados verticales. El icono de **flechas diagonales**, junto al candado de cada miniatura y en la imagen ampliada, alterna Restaurar/Estirar únicamente para esa página. Restaurar recupera las proporciones originales y puede añadir bandas; no modifica el archivo original ni los acercamientos. Debajo de cada miniatura se muestran las dimensiones originales (ancho × alto en píxeles), independientes del giro o estiramiento de salida. Las vistas horizontales siguen estiradas por defecto. Los ajustes por página se reinician al cargar otro manga.

1. Carga un CBR, CBZ o PDF en la misma pantalla.
2. Mantén XTC de 1 bit, Floyd–Steinberg, tonos originales (gamma 1) y ningún contraste adicional. El perfil activa **Reducir grano en páginas a color** y **Limpiar blancos y grises casi blancos**. **Realzar solo la portada** queda desactivado: se prioriza la lectura, no la miniatura del carrusel.
3. En **División de página** elige **Sin división**, **Automática** o **Viñetas**. Automática permite **Proporcional** (predeterminado) o **Legibilidad**. La orientación se elige aparte.
4. Abre **Revisar páginas → Abrir galería**. Se muestran 12 páginas por bloque con botones anterior y siguiente.
5. Cada miniatura tiene **Girar**, **Excluir/Incluir** y un candado. Haz clic en la imagen para verla ampliada y completa, sin un menú adicional.
   Las miniaturas aparecen por lotes mientras se prepara el resto del libro. **Girar Horizontalmente** aparece cuando termina la carga, con dos iconos (botones a la derecha/izquierda) que toman inicialmente el sentido de lectura elegido. Aplica ese sentido a todas las imágenes originalmente apaisadas y respeta candados y exclusiones. Repetirlo no acumula giros; las verticales originales no cambian, aunque las hayas girado manualmente.
   El giro se ve en la miniatura, en la revisión ampliada y en la comparación; también se aplica al XTC/XTCH final.
   El candado fija una página completa, sin división, en su orientación visible. Para cambiarla, desbloquea, gira y vuelve a bloquear. El giro masivo y las opciones generales no cambian páginas bloqueadas.
6. **Excluir** omite una imagen al convertir; **Incluir** la recupera. No borra el original.
7. **Orientación de lectura** tiene cuatro iconos: vertical con botones abajo, horizontal con botones a la derecha, vertical con botones arriba y horizontal con botones a la izquierda. El valor inicial es **horizontal con botones a la derecha**: la imagen gira **90° (CW)**; con botones a la izquierda gira **270° (CCW)**. El giro de la imagen compensa el giro físico del lector, no lo imita. Esa correspondencia se usa tanto en la galería como en la salida. Si no se detectan bien las viñetas, solo esa página pasa a división automática. Las horizontales muestran primero la imagen completa y luego acercamientos. El acercamiento **Horizontal** corta la imagen original en dos filas (superior primero); **Vertical** usa columnas derechas antes que izquierdas. El check **Dividir imágenes en horizontal** activa esto también en los otros modos, incluso Sin división; en Viñetas ya está activo. Los candados y la portada vertical protegida tienen prioridad sobre la orientación automática.
8. Pulsa **Convertir →** y revisa la previsualización antes de copiar el XTC al lector. **Cancelar** detiene el proceso entre operaciones, sin guardar un archivo parcial; los archivos terminados antes de cancelar se conservan.

Todo el análisis y la conversión se ejecutan en el navegador local. No se usa Gemini ni se suben páginas a un servidor. La pantalla principal está dedicada al manga y en español. Los iconos ? muestran ayuda al pasar el ratón o al hacer clic.

La pestaña **Fusionar/Dividir** admite CBR, CBZ, PDF, XTC y XTCH. La división admite rangos o partes iguales. Al dividir o fusionar CBR, las partes se guardan en **CBZ**, conservando los bytes de las imágenes extraídas; no se generan archivos RAR/CBR. Para fusionar XTC/XTCH, usa archivos con la misma profundidad de gris; los datos de imagen se conservan sin volver a tramarlos.
Los ajustes avanzados de tonos están plegados; las opciones habituales se eligen con botones, no listas desplegables.

Antes de convertir todo el tomo, abre **Comparar original y resultado** y prueba la portada y una página con texto. A resolución pequeña, el navegador puede distorsionar el tramado; revisa también el resultado en el lector.

La comparación muestra una página de salida por vez, con flechas y **Ampliar**. **Revisar resultado** abre un visor centrado que ajusta la página completa a la pantalla y permite girar la vista. Ambas vistas decodifican los mismos píxeles exportados, sin volver a aplicar filtros.

**Reducir grano en páginas a color** detecta color antes de convertir a gris continuo y aclara moderadamente tonos claros. No aplica este tratamiento a páginas monocromas. Puede perder matices claros: desactívalo si prefieres preservar todos los tonos. **Realzar solo la portada** refuerza solo las sombras de la primera página, manteniendo el aclarado de color y la limpieza de blancos. Comparte una sola curva con el contraste de color, sin acumular ambos efectos. No estira el histograma ni añade gamma global. Los ajustes propios de portada tienen prioridad y omiten ese realce automático.

Es necesario volver a convertir el manga: los XTC ya creados no cambian. Para probar sin reutilizar miniaturas anteriores del lector, guarda el resultado con otro nombre. No se mezcla una portada JPEG dentro del XTC: las páginas permanecen en el formato nativo del lector.

Al dividir una imagen originalmente horizontal, los giros de 90° o 270° de la galería ya no se acumulan con el giro de lectura: los cortes usan los ejes horizontales originales. En **Vertical** las columnas quedan derechas, y solo la imagen completa inicial se gira según CW/CCW. Las páginas bloqueadas conservan su giro manual y no se dividen. Un giro manual de 180° se conserva como corrección explícita del contenido.

## Dispositivos

Todos los ajustes de división, relleno y tonos se aplican al dispositivo seleccionado: **X3: 528 × 792**, **X4 / Classic V2: 480 × 800**, **X4 Pro: 480 × 800**. Classic V2 comparte el perfil de resolución del X4. El perfil no instala firmware ni garantiza que todas las funciones de CrossInk estén disponibles en otro modelo; comprueba el formato admitido por el firmware del lector.

## Limitaciones reales

Todas las casillas de **Preparación de página** están activadas inicialmente. La portada no recibe ajustes propios hasta que los selecciones manualmente. **Mantener la portada vertical** y los candados tienen prioridad sobre la división horizontal. **Sin división** omite los acercamientos automáticos aunque su casilla esté marcada. Desactivar **Recortar márgenes** también desactiva **Quitar números aislados al pie**, que depende del recorte; al volver a activar el recorte puedes elegir de nuevo quitar los números.

La división horizontal genera más páginas de salida y aumenta el tamaño del archivo y el trabajo de conversión. Los filtros se aplican una vez por salida, después del ajuste de tamaño; el realce de portada y de color no se duplica. El coste y consumo de memoria total también dependen del tamaño y número de imágenes originales, la descompresión, las vistas previas y el dispositivo donde se convierte.

**Definir líneas y texto** refuerza suavemente bordes oscuros conectados después del ajuste de tamaño y antes del tramado. Evita amplificar puntos aislados o texturas claras, no añade halos blancos y limita el oscurecimiento a 12 niveles. No reconstruye detalle que falta en el original y puede reforzar tramas oscuras conectadas; desactívalo para comparar. Está activado inicialmente.

**Más contraste en páginas a color** refuerza exclusivamente sombras de fuentes detectadas a color; conserva valores de gris de 160 a 255, sin recortar percentiles del histograma. Puede perder matices de sombras. Es independiente de reducir grano y de los tonos globales, y está activado inicialmente. Las páginas monocromas no reciben este contraste adicional.

La limpieza de blancos ya admite Sierra Lite real en JavaScript; no sustituye ese algoritmo por Floyd. Gamma y contraste globales permanecen inicialmente en 1,00 y 0,00: una subida global puede oscurecer también la piel. Los presets de contraste Suave y Medio son ahora 0,35 y 0,75; los deslizadores permiten ajustes finos de 0,01 en gamma y 0,05 en contraste. La vista y la exportación usan el mismo procesamiento.

**Tonos globales** permite ajustar gamma y contraste de todo el libro. En la galería, abre una imagen y activa **Usar ajustes propios** para reemplazar esos valores solo en esa página; no se suman dos veces al realce de portada. Gamma mayor oscurece, y menor aclara. Los ajustes por página se limpian al cambiar de archivo.

**Rellenar pantalla completa** nunca estira el dibujo. En Legibilidad amplía las franjas bajas hacia arriba y abajo con contenido vecino; se repite lo necesario para alcanzar la proporción de la pantalla. Desactivado, conserva la franja natural con márgenes. En Proporcional las ventanas ya se calculan con esa proporción. Las viñetas individuales, filas demasiado altas y páginas completas mantienen todo el contenido con márgenes si hace falta. No se promete llenar todos los casos a costa de recortar texto.

**Proporcional** calcula la altura de la ventana como ancho de la página / proporción de la pantalla. Mantiene ancho y escala comunes, distribuye ventanas desde el inicio al final y usa al menos un 8% de solapamiento; no fuerza un máximo de cuatro en páginas muy altas. Puede atravesar globos: no garantiza un diálogo completo en una sola ventana.

**Legibilidad** busca calles y bordes de viñeta y solapa globos o dibujos que cruzan el corte. El relleno amplía franjas bajas sin deformar; elimina ventanas completamente contenidas en otra y evita añadir una franja muy baja al subdividir una fila. Si no encuentra calles fiables, recurre a franjas solapadas. No garantiza detección perfecta ni una escala idéntica entre filas muy diferentes.

Los márgenes externos se analizan en la página completa, antes de dividir. No se vuelve a recortar el blanco de cada fragmento: el fondo blanco de una ilustración es parte de su composición.

La portada comienza con **ajustes propios activos: gamma 1 y contraste 0**. **Restablecer** vuelve a esos tonos neutrales. Se retiró la estimación de miniatura Lyra del inspector. Al mover los sliders se mantiene la última imagen XTC hasta que esté lista la nueva: no se intercala el original.

**Limpiar blancos y grises casi blancos** actúa después de gamma/contraste y antes del tramado, también en páginas monocromas. Los grises 244–255 pasan a blanco y se protegen de puntos introducidos por difusión de error. No borra manchas oscuras ni tramas intencionales; puede perder sombras extremadamente tenues. Desactívalo para comparar. XTC de un bit necesita puntos para representar tonos medios: no se promete eliminar todo el grano sin perder esos tonos. XTCH conserva cuatro niveles de gris. Las comprobaciones locales no sustituyen la revisión final en el lector físico.

- La detección por viñetas busca rectángulos separados por calles blancas y rechaza resultados dudosos. Viñetas sin marco, superpuestas, diagonales o que atraviesan varias filas pueden requerir **División automática** o una selección manual en **Revisar páginas**.
- La opción panorámica con acercamientos no intenta decidir si el dibujo contiene texto: queda como decisión manual para evitar ampliar ilustraciones que ya se ven bien completas.
- El perfil predeterminado genera XTC de 1 bit: ocupa aproximadamente la mitad que XTCH, suele cargar y cambiar de página más rápido y deja negros más firmes. XTCH conserva cuatro grises, pero puede mostrar más ghosting durante actualizaciones parciales.
- Ningún formato puede conservar todo el detalle del JPEG original después de reducirlo a 480 × 800 y a uno o cuatro niveles de gris.
- La galería procesa hasta cuatro miniaturas simultáneamente. PDF renderiza directamente a tamaño de miniatura y CBR reutiliza la extracción de la previsualización. La extracción inicial de un CBR grande puede seguir tardando: no se puede interrumpir a mitad de esa operación síncrona.
# Acercamientos de páginas horizontales

Con Acercamientos verticales y Rellenar, las ventanas abarcan toda la altura original y tienen el ancho proporcional a la pantalla del lector. Se solapan y se leen de derecha a izquierda, sin estirar ni recortar márgenes por fragmento. La imagen horizontal completa se estira para llenar toda la pantalla, sin cortar contenido; los personajes pueden verse más anchos. Esto se aplica a las vistas completas apaisadas del manga, incluso sin división o con candado horizontal. Los candados verticales y la portada protegida verticalmente siguen respetándose. El espacio blanco que forma parte del dibujo no se elimina para forzar el relleno. Los acercamientos y las páginas verticales conservan sus proporciones.

