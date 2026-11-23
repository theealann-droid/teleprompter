# "El mesero noob" — Guion v1

Short vertical 1080×1920 · ~25 s · estilo Roblox 2D original
Salsa: **salsa de palta** (verde, con ojitos) — reemplaza a la salsa original del anuncio de referencia.
Marca ficticia: **SUSHI BLOQUE** (pendiente de confirmar si se usa la marca real del usuario).

## Personajes (originales)

| Personaje | Rol | Diseño | Rasgos de actuación |
|---|---|---|---|
| **TITO** | Cocinero noob, protagonista | Cabeza cuadrada, pelo negro desordenado, delantal negro con cinta roja, camiseta amarilla de noob, ojos enormes | Sudor, cejas asimétricas de preocupación, sonrisa nerviosa, cachetes llenos al comer |
| **DON CUADROS** | Cliente | Cabeza cuadrada con entradas, camisa a cuadros gris/azul, brazos cruzados sobre el mostrador | Enojo creciente: cejas hacia adentro, temblor, mirada de horror ante la salsa |
| **JEFA PIXELA** | Dueña / jefa | Pelo largo negro en bloque, polera negra con logo, laptop, cara de cansancio | Poca expresión al inicio; al final, boca abierta y ojos enormes |
| **SALSA DE PALTA** | Gag recurrente | Charco verde con 2 ojitos que parpadean y siguen a Tito | Gotea, parpadea, mira al cliente |

## UI de juego (en código)
- **Ticket de pedido** arriba a la izquierda: `PEDIDO #8 — SIN SALSA`.
- **Contador de errores** arriba al centro: `ERRORES 1/3` (sube a 2/3 y 3/3, pasa a rojo).
- **Pop-ups:** `¡PEDIDO ERRÓNEO!` · `ROLLS COMIDOS +1` · `LOGRO: COME-ERRORES` · `GAME OVER` · `RESPAWN`.

## Guion por escenas

**ESC 1 — GANCHO (0–3 s) · Mostrador, plano cerrado**
- Acción: plato con roll bañado en salsa de palta que gotea. La salsa parpadea. Sirena + pop-up `¡PEDIDO ERRÓNEO!`. Contador 1/3.
- CLIENTE: «¡Oye! ¡Yo pedí **sin** salsa de **palta**!»
- Cámara: zoom rápido al plato, corte seco al cliente enojado.
- SFX: sirena corta, "boing" de la salsa.

**ESC 2 — LA EXCUSA (3–9 s) · Mostrador, plano medio**
- TITO (sudando, sonrisa nerviosa): «Tranquilo, es salsa de la casa.»
- CLIENTE (la salsa le sigue con la mirada): «¡Está verde y me **mira**!»
- TITO (revisa el ticket, ceja arriba): «Mmm… según el ticket, este no es tu pedido.»
- CLIENTE: «¡Eso dije!» → contador 2/3, temblor de pantalla.
- SFX: tic-tac del ticket, golpe de mostrador, "ding" de error.

**ESC 3 — EL GIRO (9–16 s) · Cocina trasera, whip pan**
- Whip pan: Tito corre con el plato hacia la Jefa. Ella teclea sin mirar.
- TITO: «Jefa, ¿puedo comerme este **también**?»
- HUD: `ROLLS COMIDOS: 7` → `8`. Pop-up `LOGRO: COME-ERRORES`.
- Gag visual: detrás de Tito, torre de platos vacíos con sellos de "ERROR".
- SFX: whoosh, nom-nom, fanfarria de logro.

**ESC 4 — REMATE (16–22 s) · Close-up Jefa**
- JEFA (levanta la vista despacio): «¿También?…»
- Close-up: ella mira el plato. Pausa de 0,5 s con tic-tac.
- JEFA: «Tito. Esa palta era **mía**.»
- Contador 3/3 en rojo, pop-up `GAME OVER`, Tito se desarma en cubos.
- SFX: silencio de 0,5 s, impacto grave, cristal roto de "game over".

**ESC 5 — LOOP (22–25 s) · Mostrador**
- Tito reaparece con `RESPAWN`, sonrisa enorme, nueva bandeja: otro roll bañado en palta con ojitos.
- TITO: «¡Bienvenidos! ¿Qué van a pedir?»
- Enlaza visualmente con ESC 1 (plato goteando, parpadeo).

## Palabras destacadas en subtítulos
Verde: **palta** · Rojo: **ERROR**, **mira** · Rosa: **también** · Amarillo: **mía**.
Subtítulos grandes, 1–5 palabras, un pop de escala por palabra activa, tercio medio-inferior.

## Notas
- Diálogo ~42 palabras; el resto es acción, UI y SFX. La duración depende de la voz elegida.
- Las mecánicas (errores 3/3, respawn, logros) son ficticias y parte del cuento, no mecánicas reales de Roblox.
- Todos los personajes, nombres y gags son originales; no se reutiliza arte, footage ni marca del anuncio de referencia.
