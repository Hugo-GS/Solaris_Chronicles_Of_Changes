// minijuego1.js
class Minijuego1 {
  constructor() {
    // Definir las variables específicas del minijuego
    this.treeImages = [];
    this.bushImage;
    this.waterButtonImage;
    this.shovelButtonImage;
    this.baseImage;
    this.rabbitImages = [];
    this.fireImages = [];
    this.extinguishedFireImages = [];
    this.birdImages = [];
    this.slothImage;
    this.slothFireImages = [];
    this.tatuFireImages = [];
    this.birdFireImages = [];
  }

  cargarImagenes() {
    const basePath = "/assets/minijuego1/";

    // Cargar imágenes del minijuego
    this.baseImage = loadImage(basePath + "suelo.png");
    this.treeImages[0] = loadImage(basePath + "arbol1.png");
    this.bushImage = loadImage(basePath + "arbusto.png");
    this.waterButtonImage = loadImage(basePath + "botonagua.png");
    this.shovelButtonImage = loadImage(basePath + "botonpala.png");
    this.rabbitImages[0] = loadImage(basePath + "conejo.png");
    this.fireImages[0] = loadImage(basePath + "fuego.png");
    this.slothImage = loadImage(basePath + "perezoso.png");
    this.slothFireImages[0] = loadImage(basePath + "perezosoincendio.png");
    this.tatuFireImages[0] = loadImage(basePath + "tatuquemado.png");
    this.birdFireImages[0] = loadImage(basePath + "pajaroquemado.png");

    // Definir las animaciones
    frameData["fire"] = {
      sprite: this.fireImages[0],
      totalFrames: 4,
      frameWidth: this.fireImages[0].width / 4,
      frameHeight: this.fireImages[0].height,
      currentFrame: 0,
      animationSpeed: 8,
      frameTimer: 0,
    };

    frameData["perezosoIncendio"] = {
      sprite: this.slothFireImages[0],
      totalFrames: 13,
      frameWidth: this.slothFireImages[0].width / 13,
      frameHeight: this.slothFireImages[0].height,
      currentFrame: 0,
      animationSpeed: 10,
      frameTimer: 0,
    };

    frameData["tatuIncendio"] = {
      sprite: this.slothFireImages[0],
      totalFrames: 16,
      frameWidth: this.slothFireImages[0].width / 16,
      frameHeight: this.slothFireImages[0].height,
      currentFrame: 0,
      animationSpeed: 10,
      frameTimer: 0,
    };

    frameData["pajaroIncendio"] = {
      sprite: this.slothFireImages[0],
      totalFrames: 3,
      frameWidth: this.slothFireImages[0].width / 3,
      frameHeight: this.slothFireImages[0].height,
      currentFrame: 0,
      animationSpeed: 10,
      frameTimer: 0,
    };
  }

  dibujar() {
    // Dibujar el suelo
    const cantAnchoSuelo = Math.ceil(width / this.baseImage.width);
    const cantAltoSuelo = Math.ceil(height / this.baseImage.height);
    for (let i = 0; i < cantAltoSuelo; i++) {
      for (let j = 0; j < cantAnchoSuelo; j++) {
        image(
          this.baseImage,
          j * this.baseImage.width,
          i * this.baseImage.height,
          this.baseImage.width,
          this.baseImage.height
        );
      }
    }

    // Usar la función de animación para mostrar sprites
    animateSprite("fire", 300, 300, 3);
    animateSprite("perezosoIncendio", 300, 280, 3);
  }
}
