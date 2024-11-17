const preguntas = [
    "¿Consumes azúcar en exceso frecuentemente?",
    "¿Sientes ansiedad cuando no consumes azúcar?",
    "¿Experimentas subidas rápidas de energía al consumir azúcar?",
    "¿Tienes dolores de cabeza al reducir el consumo de azúcar?",
    "¿Te sientes irritable al reducir el consumo de azúcar?"
];

let respuestas = []; // Almacena las respuestas del usuario
let indicePregunta = 0; // Índice de la pregunta actual

// Referencias al DOM
const chatBox = document.getElementById("chat-box");
const sendButton = document.getElementById("send-button");

// Función para agregar mensajes al chat
function agregarMensaje(remitente, mensaje) {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.className = remitente === "bot" ? "bot" : "usuario";
    mensajeDiv.textContent = mensaje;
    chatBox.appendChild(mensajeDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll al final del chat
}

// Función para manejar los botones de respuesta rápida
function agregarBotonesOpciones(opciones) {
    // Asegúrate de eliminar botones anteriores si existen
    const botonesExistentes = document.querySelector(".opciones");
    if (botonesExistentes) botonesExistentes.remove();

    const botonesDiv = document.createElement("div");
    botonesDiv.className = "opciones";
    opciones.forEach((opcion) => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.onclick = () => {
            manejarOpcionSeleccionada(opcion);
            botonesDiv.remove(); // Elimina los botones tras la selección
        };
        botonesDiv.appendChild(boton);
    });
    chatBox.appendChild(botonesDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

// Función para manejar la selección de una opción
function manejarOpcionSeleccionada(opcion) {
    agregarMensaje("usuario", opcion);
    respuestas.push(opcion.toLowerCase());
    indicePregunta++;

    if (indicePregunta < preguntas.length) {
        setTimeout(() => {
            agregarMensajeConDelay("bot", preguntas[indicePregunta], 1500);
            agregarBotonesOpciones(["Sí", "No"]); // Muestra opciones de nuevo
        }, 1500);
    } else {
        setTimeout(() => mostrarDiagnostico(), 1500); // Diagnóstico con retraso
    }
}

// Función para mostrar el estado "escribiendo..."
function agregarEscribiendo() {
    const escribiendoDiv = document.createElement("div");
    escribiendoDiv.id = "escribiendo";
    escribiendoDiv.className = "bot";
    escribiendoDiv.textContent = "Escribiendo...";
    chatBox.appendChild(escribiendoDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Función para eliminar el estado "escribiendo..."
function removerEscribiendo() {
    const escribiendoDiv = document.getElementById("escribiendo");
    if (escribiendoDiv) escribiendoDiv.remove();
}

// Función para agregar mensajes con un retraso (simulación de "pensar")
function agregarMensajeConDelay(remitente, mensaje, delay = 1000) {
    agregarEscribiendo();
    setTimeout(() => {
        removerEscribiendo();
        agregarMensaje(remitente, mensaje);
    }, delay);
}

// Función para calcular el diagnóstico y mostrar mensaje colorido
function mostrarDiagnostico() {
    let respuestasPositivas = respuestas.filter(respuesta => respuesta === "sí").length;
    let adiccionConfirmada = respuestasPositivas > 3; // Si más de 3 respuestas son afirmativas

    const diagnosticoElement = document.createElement("div");
    diagnosticoElement.className = "bot diagnostico"; // Clase para diagnóstico
    let mensajeDiagnostico;

    if (adiccionConfirmada) {
        // Diagnóstico positivo
        mensajeDiagnostico = "¡Alerta! Tienes una alta adicción al azúcar.";
        diagnosticoElement.classList.add("positivo"); // Color de alerta
        const alarma = document.createElement("div");
        alarma.classList.add("alarma");
        alarma.textContent = "¡Cuidado! La adicción al azúcar puede afectar gravemente tu salud.";
        diagnosticoElement.appendChild(alarma);
    } else {
        // Diagnóstico negativo
        mensajeDiagnostico = "Tu nivel de adicción al azúcar es bajo, pero no te relajes.";
        diagnosticoElement.classList.add("negativo"); // Color tranquilo
    }

    diagnosticoElement.textContent = mensajeDiagnostico;
    chatBox.appendChild(diagnosticoElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Iniciar la conversación con el bot
agregarMensaje("bot", preguntas[indicePregunta]);
agregarBotonesOpciones(["Sí", "No"]); // Opciones iniciales
