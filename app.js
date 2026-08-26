const SUPABASE_URL =
  "https://mmjsgrdujjomopefkzeq.supabase.co";

const SUPABASE_KEY =
  "sb_publishable__UgjBRf9uxweu8yEFQNvbw_wo10XxZY";

const frasesCierre={
  es:"de antemano muchas gracias por responder",
  en:"thank you in advance for replying",
  fr:"merci d avance de me répondre",
  pt:"desde já muito obrigado por responder",
  it:"grazie in anticipo per la risposta",
  de:"vielen dank im voraus für ihre antwort"
};

const prohibidos = [
  /\b(sexo|sexual|pornograf|coito|penetraci[oó]n|masturbaci[oó]n|orgasmo)\b/i,
  /\b(er[oó]tico|er[oó]tica)\b/i
];

document
  .getElementById("f")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const estado =
      document.getElementById("estado");

    const mensaje =
      document.getElementById("mensaje").value.trim();

    const nombre =
      document.getElementById("nombre").value.trim();

    const correo =
      document.getElementById("correo").value.trim();

    const seleccionados = [
      ...document.querySelectorAll(
        'input[name="motivo"]:checked'
      )
    ];

    if (!seleccionados.length) {

      estado.className = "error";

      estado.textContent =
        "Selecciona por lo menos un motivo.";

      return;
    }

    if (prohibidos.some((r) => r.test(mensaje))) {

      estado.className = "error";

      estado.textContent =
        "El mensaje contiene contenido no permitido y no puede enviarse.";

      document.getElementById("mensaje").value = "";

      return;
    }

    const mensajeNormalizado =
      mensaje
        .toLocaleLowerCase("es-MX")
        .replace(/[.\s]+$/g, "");

    const lang=(window.apoyoLang||"es");
    const frase=(frasesCierre[lang]||frasesCierre.es);
    if (!mensajeNormalizado.endsWith(frase)) {
      estado.className="error";
      const cierre=(window.apoyoCierreTexto&&window.apoyoCierreTexto[lang])||"De antemano muchas gracias por responder.";
      estado.textContent=`Para enviarlo, finaliza con: “${cierre}”`;
      return;
    }

    estado.className = "";

    estado.textContent =
      "Enviando solicitud...";

    const ahora = Date.now();

    const numero =
      String(ahora).slice(-8);

    const folio =
      "MAP-" + numero;

    const ASESORES = Array.from({length:20}, (_,i) => 1010 + i*10);

    const asesor =
      ASESORES[ahora % ASESORES.length];

    const motivos =
      seleccionados
        .map((x) => x.value)
        .join(" | ");

    const datos = {
      folio: folio,
      nombre: nombre,
      correo: correo,
      pais: document.getElementById("pais").value,
      motivos: motivos,
      mensaje: mensaje,
      asesor: asesor,
      estado: "pendiente"
    };

    try {

      const respuesta =
        await fetch(
          `${SUPABASE_URL}/rest/v1/Solicitudes`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "apikey":
                SUPABASE_KEY,

              "Prefer":
                "return=minimal"
            },

            body:
              JSON.stringify(datos)
          }
        );

      if (!respuesta.ok) {

        const error =
          await respuesta.text();

        console.error(
          "Error Supabase:",
          error
        );

        throw new Error(
          "No se pudo guardar la solicitud."
        );
      }

      estado.className = "ok";

      estado.textContent =
        `Solicitud recibida correctamente. ` +
        `Número de mensaje: ${folio}. ` +
        `Asignado al Asesor ` +
        `${asesor}.`;

      e.target.reset();

    }

    catch (error) {

      console.error(error);

      estado.className = "error";

      estado.textContent =
        "No fue posible enviar el mensaje en este momento. Inténtalo nuevamente.";
    }

  });


let cantidadDonacion = null;

document
  .querySelectorAll(".monto")
  .forEach((boton) => {

    boton.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".monto")
          .forEach((b) =>
            b.classList.remove("activo")
          );

        boton.classList.add("activo");

        cantidadDonacion =
          Number(boton.dataset.monto);

        document
          .getElementById("donacionOtro")
          .value = "";

        document
          .getElementById("montoSeleccionado")
          .textContent =
            `Donación seleccionada: $${cantidadDonacion} MXN`;

      }
    );

  });


document
  .getElementById("donacionOtro")
  .addEventListener(
    "input",
    (e) => {

      document
        .querySelectorAll(".monto")
        .forEach((b) =>
          b.classList.remove("activo")
        );

      cantidadDonacion =
        Number(e.target.value);

      if (cantidadDonacion > 0) {

        document
          .getElementById("montoSeleccionado")
          .textContent =
            `Donación seleccionada: $${cantidadDonacion} MXN`;

      }

      else {

        document
          .getElementById("montoSeleccionado")
          .textContent =
            "Selecciona la cantidad que deseas donar.";

      }

    }
  );


document
  .getElementById("btnDonar")
  .addEventListener(
    "click",
    () => {

      if (!cantidadDonacion ||
          cantidadDonacion <= 0) {

        alert(
          "Selecciona una cantidad para donar."
        );

        return;
      }

      alert(
        `Has seleccionado donar $${cantidadDonacion} MXN. ` +
        `La conexión con PayPal será habilitada próximamente.`
      );

    }
  );


setInterval(() => {

  const p =
    document.createElement("span");

  p.className =
    "petalo";

  p.textContent =
    "🌹";

  p.style.left =
    Math.random() * 100 + "vw";

  p.style.setProperty(
    "--x",
    Math.random() * 160 - 80 + "px"
  );

  p.style.animationDuration =
    7 + Math.random() * 5 + "s";

  document.body.appendChild(p);

  setTimeout(
    () => p.remove(),
    12500
  );

}, 1200);
