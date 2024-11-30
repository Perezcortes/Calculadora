const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

// Manejo de eventos para los botones de la calculadora
buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = ""; // Limpia el display
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1); // Borra el último carácter
    } else if (display.innerText != "" && item.id == "equal") {
      try {
        display.innerText = eval(display.innerText); // Calcula la expresión
      } catch (error) {
        display.innerText = "Error";
        setTimeout(() => (display.innerText = ""), 2000); // Limpia después de 2 segundos
      }
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000); // Limpia después de 2 segundos
    } else {
      display.innerText += item.id; // Añade el contenido del botón al display
    }
  };
});

// Alternar entre temas claro y oscuro
const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const themeIcon = document.querySelector(".theme-toggler i"); // Icono del tema
let isDark = true;

themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark"); // Cambia la clase de la calculadora
  themeToggleBtn.classList.toggle("active"); // Cambia el estilo del botón
  isDark = !isDark; // Alterna el estado del tema

  // Cambiar icono según el tema
  if (isDark) {
    themeIcon.classList.remove("fa-sun"); // Elimina el icono de sol
    themeIcon.classList.add("fa-moon"); // Muestra el icono de luna
  } else {
    themeIcon.classList.remove("fa-moon"); // Elimina el icono de luna
    themeIcon.classList.add("fa-sun"); // Muestra el icono de sol
  }
};

// Animación de los sprites
function animateSprite(containerId, spritePath, frameWidth, frameHeight, totalFrames, interval) {
  const container = document.getElementById(containerId);
  const canvas = document.createElement("canvas");
  canvas.width = frameWidth;
  canvas.height = frameHeight;
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const spriteImage = new Image();
  spriteImage.src = spritePath;

  let currentFrame = 0;

  spriteImage.onload = () => {
    setInterval(() => {
      const frameX = currentFrame * frameWidth;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        spriteImage,
        frameX,
        0, // Siempre toma de la primera fila del sprite
        frameWidth,
        frameHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      currentFrame = (currentFrame + 1) % totalFrames; // Cambia al siguiente frame
    }, interval);
  };
}

/* Configuración para los dos sprites,
ancho, alto, frames, tiempo */
animateSprite("sprite-left", "./sprite1.png", 230, 223, 3, 1500); // Sprite izquierdo
animateSprite("sprite-right", "./sprite2.png", 230, 223, 3, 1500); // Sprite derecho
