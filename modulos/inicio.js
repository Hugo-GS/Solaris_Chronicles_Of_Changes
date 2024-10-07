class Inicio {
  constructor() {
    this.backgroundImage;
    this.startTime;
    this.displayDuration = 2000; // 2 segundos en milisegundos
    this.isShowing = true; // Controla si se está mostrando la introducción
  }

  cargarImagenes() {
    const basePath = "/assets/inicio/";
    this.backgroundImage = loadImage(basePath + "fondo_sol.jpeg");
  }

  iniciar() {
    this.startTime = millis(); // Guardar el tiempo de inicio
  }

  dibujar() {
    if (this.isShowing) {
      background(this.backgroundImage);

      // Verificar si han pasado 2 segundos
      if (millis() - this.startTime > this.displayDuration) {
        this.isShowing = false; // Dejar de mostrar la introducción
      }
    }
  }
}
