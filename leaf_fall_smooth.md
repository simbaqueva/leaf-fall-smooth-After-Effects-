# leaf_fall_smooth.jsx — Guía del Script

## ¿Qué hace el script?

Es un script llamado **"Caída de hoja suave"** (`leaf_fall_smooth.jsx`) que automatiza la creación de una animación de **caída de hojas** en Adobe After Effects. Al ejecutarlo sobre una o más capas seleccionadas, les aplica automáticamente **expresiones (expressions)** de animación para simular una caída natural, orgánica y suave.

## ¿Para qué programa es?

Es para **Adobe After Effects** (Windows o Mac). Se trata de un script en formato **.jsx** (ExtendScript), que es el lenguaje de scripting nativo de After Effects. Se ejecuta desde el panel "File > Scripts > Run Script File..." o mediante el menú de scripts.

## ¿Cómo funciona?

El script trabaja sobre la composición activa y las capas seleccionadas:

1. **Verifica el contexto**: Comprueba que hay una composición activa y que hay capas seleccionadas. Si no, muestra una alerta y se detiene.
2. **Itera sobre cada capa seleccionada**: Solo procesa capas de tipo `AVLayer` (capas de video/audio/sólido/imagen, etc.).
3. **Genera valores aleatorios por capa**: Para que cada hoja caiga de forma distinta, calcula aleatoriamente:
   - Distancia de caída (420 a 520 px)
   - Semilla (`seed`) para la aleatoriedad
   - Rotación extra (20 a 50 grados)
4. **Aplica una expresión a la Posición (`Position`)**: Crea una caída con:
   - `fall`: movimiento descendente con `ease` (suavizado)
   - `drift`: deriva lateral
   - `sway`: vaivén horizontal
   - `floatY`: flotación vertical oscilante
   - Todo atenuándose con el tiempo
5. **Aplica una expresión a la Rotación (`Rotation`)**: El movimiento de rotación (spin) y un balanceo (wobble) que se atenúa.
6. **Aplica una expresión a la Opacidad (`Opacity`)**: La hoja baja su opacidad de 100 a 88 durante la caída.
7. **Agrupa todo en un solo paso de "Undo"** (`beginUndoGroup`/`endUndoGroup`) para que puedas deshacer todo con un solo Ctrl+Z.

## Requisitos previos

- **Adobe After Effects** instalado (cualquier versión reciente que soporte ExtendScript).
- Tener un **proyecto abierto** con una **composición**.
- Tener **una o más capas seleccionadas** en esa composición (por ejemplo, imágenes de hojas, sólidos, etc.).
- Las capas deben tener asignadas propiedades de **Position** (todas las AVLayer la tienen), y opcionalmente Rotation y Opacity.
- El archivo `.jsx` guardado en tu computadora.

## ¿Cómo ejecutarlo?

1. Abre tu proyecto en **After Effects**.
2. Crea o abre una **composición**.
3. Importa tus capas (las "hojas") y **selecciónalas** en el panel de Línea de Tiempo.
4. Ve al menú **File > Scripts > Run Script File...** (o usa el atajo de teclado correspondiente).
5. Navega hasta el archivo `leaf_fall_smooth.jsx` y selecciónalo.
6. El script se ejecuta y aplica las expresiones de caída a las capas seleccionadas.
7. Reproduce la composición para ver la animación de hojas cayendo.

## Objetivo del script

El objetivo es **automatizar y agilizar la creación de animaciones de caída de hojas realistas** en After Effects, sin necesidad de hacer keyframes manualmente ni escribir expresiones a mano. Cada hoja cae con movimientos aleatorios y suaves (caída, deriva, vaivén, flotación y rotación), lo que da un resultado natural y orgánico, ideal para escenas de otoño, entornos naturales, fondos animados, etc.