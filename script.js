// --- Transiciones entre secciones ---
const sections = document.querySelectorAll(".section");
const navItems = document.querySelectorAll(".sidebar ul li");

let current = 0;

function showSection(index){
  sections.forEach((sec, i) => {
    sec.classList.toggle("active", i === index);
  });
  navItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
  current = index;

  // regenerar burbujas al cambiar de sección
  generateBubbles();
}

// evento click navbar
navItems.forEach((item, i) => {
  item.addEventListener("click", (e) => {

    // obtener posición del icono
    const rect = item.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    generateBubbles(x, y); // 💫 desde el icono
    showSection(i);
  });
});

// scroll fluido circular
window.addEventListener("wheel", (e)=>{
  if(e.deltaY > 0){ 
    // scroll hacia abajo
    const next = (current + 1) % sections.length; // vuelve al inicio si es el último
    showSection(next);
  } else if(e.deltaY < 0){ 
    // scroll hacia arriba
    const prev = (current - 1 + sections.length) % sections.length; // vuelve al final si es el primero
    showSection(prev);
  }
});

// --- Swipe en celular (circular) ---
let touchstartY = 0;
let touchendY = 0;

document.addEventListener('touchstart', e => {
  touchstartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', e => {
  touchendY = e.changedTouches[0].screenY;

  if(touchendY < touchstartY - 50){ 
    // swipe arriba → siguiente
    const next = (current + 1) % sections.length;
    showSection(next);
  }
  if(touchendY > touchstartY + 50){ 
    // swipe abajo → anterior
    const prev = (current - 1 + sections.length) % sections.length;
    showSection(prev);
  }
}, false);

// --- Countdown ---
function countdown(){
  const eventDate = new Date("April 11, 2026 13:30:00").getTime();
  const now = new Date().getTime();
  const diff = eventDate - now;

  if(diff <= 0){
    document.getElementById("countdown").innerHTML = "¡El gran día ha llegado!";
    return;
  }

  const days = Math.floor(diff/(1000*60*60*24));
  const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const mins = Math.floor((diff%(1000*60*60))/(1000*60));
  const secs = Math.floor((diff%(1000*60))/1000);

  document.getElementById("countdown").innerHTML = 
    `${days}d ${hours}h ${mins}m ${secs}s`;
}
setInterval(countdown,1000);

// --- Generador de burbujas dinámico ---
function generateBubbles(originX = window.innerWidth / 2, originY = window.innerHeight / 2){
  const container = document.querySelector(".bubbles");
  container.innerHTML = "";

  const total = 140; // 🔥 más partículas para explosión intensa

  for(let i=0; i<total; i++){
    const span = document.createElement("span");

    // posición inicial (icono)
    span.style.left = originX + "px";
    span.style.top = originY + "px";

    // dirección aleatoria
    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 200; // 🔥 más lejos

    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    span.style.setProperty('--x', x);
    span.style.setProperty('--y', y);

    // tipo de partícula
    const type = Math.random();
    if(type < 0.4){
      span.classList.add("dust");
    } else if(type < 0.7){
      span.classList.add("shine");
    } else {
      span.classList.add("confetti");
    }

    // tamaño variado para más profundidad
    const size = 6 + Math.random() * 18;
    span.style.width = size + "px";
    span.style.height = size + "px";

    // duración de la animación
    span.style.animationDuration = (0.8 + Math.random() * 1) + "s";

    container.appendChild(span);
  }
}

// generar al inicio
generateBubbles();

// mostrar primera sección
showSection(0);

// --- Activar música al primer tap/click ---
function iniciarMusica() {
    const music = document.getElementById("bg-music");
    if(music) {
      music.volume = 0.2;
        music.play().catch(err => console.log("Audio bloqueado:", err));
    }
    // Quitamos los listeners para que no se ejecute otra vez
    document.removeEventListener("click", iniciarMusica);
    document.removeEventListener("touchstart", iniciarMusica);
}

// Escuchar primer click o tap
document.addEventListener("click", iniciarMusica);
document.addEventListener("touchstart", iniciarMusica);

