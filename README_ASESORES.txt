ACTUALIZACIÓN APOYO.EDITHALANIS.COM — ASESORES 1000 A 1200

INCLUYE
- Cuenta 1000: administradora. Contraseña inicial: Apoyo1000
- Asesores 1010, 1020, ... 1200. Contraseña inicial: Apoyo + número.
- Cambio obligatorio de contraseña en primer ingreso.
- Cada asesor registra SPEI, PayPal o efectivo.
- La administradora puede ver los datos de pago.
- La administradora NO ve contraseñas personales.
- Botón para restablecer el acceso de un asesor a su contraseña temporal.
- Mensajes asignados y respuestas desde la página.
- Pagos semanales a $1 MXN por mensaje atendido.
- Historial Pendiente/Pagado y referencia de pago.

ANTES DE SUBIR A GITHUB
1. Entra a Supabase > SQL Editor.
2. Abre SUPABASE_CONFIGURAR_ASESORES.sql y ejecuta TODO el archivo una sola vez.
3. Si Supabase muestra error relacionado con la columna id de Solicitudes, NO subas todavía: envía captura del error para ajustar el tipo de id a tu tabla actual.
4. Cuando el SQL termine sin errores, sube/reemplaza en GitHub: index.html, app.js, styles.css, asesor.html, asesor.js, asesor.css. Conserva CNAME.

IMPORTANTE
Las contraseñas personales se almacenan como hash y no son visibles. Los datos de pago no se guardan en GitHub; quedan en Supabase y solo se consultan mediante el panel autenticado.

PAGO SEMANAL
La función apoyo_generar_corte_semanal crea el corte de una semana. La interfaz está preparada para mostrar los cortes y marcarlos como pagados.


NUEVO: INSCRIPCIÓN PÚBLICA DE ASESORES
- En la portada aparece “Quiero ser asesor”.
- Condición visible: $1.00 MXN por cada mensaje respondido.
- El importe se acumula semanalmente y se paga los sábados.
- La solicitud aparece únicamente en el panel de la administradora 1000.
- La administradora puede aceptar o rechazar.
- Al aceptar, se asigna automáticamente el siguiente número disponible entre 1010 y 1200.
- Las cuentas 1010-1200 permanecen inactivas hasta ser asignadas.
- La persona aceptada cambia su contraseña y registra su método de pago en el primer ingreso.
