/* eslint-disable no-undef, no-unused-vars */
let numeroJuego = 1; // Luego cambiarlo a 0, el cual será el estado del Menú
// MINIJUEGO 1 =====================================================
let treeImages = [];
let bushImage, waterButtonImage, shovelButtonImage, baseImage;
let rabbitImages = [];
let gameOverImage;
let fireImages = [];
let extinguishedFireImages = [];
let birdImages = [];
let slothImage;
let slothFireImages = [];
let birdFireImages = [];
let tatuFireImages = [];
let frameData = {};
let numArboles = 16;
let arboles = [];
let fuegos = [];
let perezososIncendiados = []; // Array para gestionar animaciones de perezosos
let pajarosIncendiados = []; // Array para gestionar animaciones de pajaros
let tatusIncendiados = []; // Array para gestionar animaciones de tatus
let animalesIncendiados = [];
let animalesEnCampo = [];
let parajosEnCampo = [];
let valorProbabilistico = 0.008;
let menuJuego1;
let toolsImages = [];
let toolsImagesFilter = [];
let mouseImg = [];
let toolSelected = null;
let tiempoTranquilo = 0;
let currentAnimal = null;
let score = 0;
let limitScore = 10;
let multiplicadorPuntos = 1;
let Texto; //texto para esribir el score
let valNumAno = 17;
let textScore = `0/${limitScore}`;
let textFecha = `aug-20${valNumAno}`;

// =================================================================
let derrota = false;
class MenuTools {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.scale = 3;
    /**
     * @type {Array<ObjetoInGame>}
     */
    this.tools = [];
  }

  /**
   * @param {ObjetoInGame} tool
   */
  addTool(tool) {
    if (this.tools.length === 0) {
      tool.x = this.x;
      tool.y = this.y;

      this.tools.push(tool);
      return;
    }
    const lastItem = this.tools[length - 1];
    tool.x = lastItem.x + 100;
    tool.y = this.y;
    this.tools.push(tool);
  }

  dibujar() {
    this.tools.forEach((e) => {
      e.dibujar();
    });
  }
}

// Clase base para objetos en el juego
class ObjetoInGame {
  constructor(x, y, sprite, nameObject = "") {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.scale = 3;
    this.clickedHold = false;
    this.nameObject = nameObject;
    this.spriteFilter = null;
  }

  dibujar() {
    if (this.clickedHold) {
      image(
        this.spriteFilter,
        this.x,
        this.y,
        this.sprite.width * this.scale,
        this.sprite.height * this.scale
      );
    } else {
      image(
        this.sprite,
        this.x,
        this.y,
        this.sprite.width * this.scale,
        this.sprite.height * this.scale
      );
    }
  }

  // Método para verificar si se hizo clic en este objeto
  isClicked(mx, my) {
    let width = this.sprite.width * this.scale;
    let height = this.sprite.height * this.scale;
    return (
      mx > this.x && mx < this.x + width && my > this.y && my < this.y + height
    );
  }
}

// Clase que maneja animaciones independientes
class AnimatedObject extends ObjetoInGame {
  constructor(x, y, sprite, totalFrames, animationSpeed) {
    super(x, y, sprite);
    this.totalFrames = totalFrames; // Total de frames en la animación
    this.frameWidth = sprite.width / totalFrames; // Ancho de cada frame
    this.frameHeight = sprite.height; // Alto de cada frame
    this.currentFrame = 0; // Frame actual
    this.animationSpeed = animationSpeed; // Velocidad de cambio de frames
    this.frameTimer = 0; // Contador para cambiar de frame
    this; // Indica si la animación ha terminado
  }

  // Método para dibujar y animar el sprite
  animate() {
    let scaledWidth = this.frameWidth * this.scale;
    let scaledHeight = this.frameHeight * this.scale;
    let frameX = this.currentFrame * this.frameWidth;

    image(
      this.sprite,
      this.x,
      this.y, // Posición en el canvas
      scaledWidth,
      scaledHeight, // Dimensiones en pantalla
      frameX,
      0, // Coordenadas dentro de la imagen original
      this.frameWidth,
      this.frameHeight // Tamaño del frame original
    );

    // Actualizar el contador de frames
    this.frameTimer++;
    if (this.frameTimer >= this.animationSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
      this.frameTimer = 0;

      // Marcar la animación como terminada si el frame actual vuelve a ser 0
      if (this.currentFrame === 0) {
        this.finished = true;
      }
    }
  }

  // Sobreescribimos isClicked para considerar el frame actual
  isClicked(mx, my) {
    let width = this.frameWidth * this.scale;
    let height = this.frameHeight * this.scale;
    return (
      mx > this.x && mx < this.x + width && my > this.y && my < this.y + height
    );
  }
}

// Clase extendida para manejar los fuegos con temporizador
class FireObject extends AnimatedObject {
  constructor(x, y, sprite, totalFrames, animationSpeed, indexBottom = 0) {
    super(x, y, sprite, totalFrames, animationSpeed);
    this.timeAlive = 0; // Contador para medir el tiempo que el fuego está activo
    this.bandera = false;
    this.indexBottom = indexBottom;
  }

  // Sobreescribir el método de animación para aumentar el contador
  animate() {
    super.animate();
    this.timeAlive++; // Incrementar el tiempo cada frame
  }

  // Verificar si el tiempo ha excedido el límite de 300 frames (5 segundos)
  hasExceededTime() {
    return this.timeAlive >= 300;
  }
}

function preload() {
  Texto = loadFont("/assets/fonts/PixelOperatorMono8-Bold.ttf"); //Cargar la fuente
  imageMinijuego1();
}

function getRandomAnimal() {
  const animals = ["perezoso", "tatu", "pajaro"];
  const randomAnimal = Math.floor(Math.random() * animals.length);
  return animals[randomAnimal]; // Retorna un animal aleatorio
}

function imageMinijuego1() {
  const basePath = "/assets/minijuego1/";
  // Suelo
  baseImage = loadImage(basePath + "suelo.png");
  // Árboles
  treeImages[0] = loadImage(basePath + "arbol1.png");
  // Arbusto y botones
  bushImage = loadImage(basePath + "arbusto.png");
  waterButtonImage = loadImage(basePath + "botonagua.png");
  shovelButtonImage = loadImage(basePath + "botonpala.png");
  // Conejo
  rabbitImages[0] = loadImage(basePath + "conejo.png");
  // Fuego (Sprite con 4 frames en fila horizontal)
  fireImages[0] = loadImage(basePath + "fuego.png");
  // Fuego apagado
  extinguishedFireImages[0] = loadImage(basePath + "fuegoapagado.png");
  // Pájaro
  birdImages[0] = loadImage(basePath + "pajaro.png");
  birdImages[1] = loadImage(basePath + "pajaro2.png");
  // Perezoso
  slothImage = loadImage(basePath + "perezoso.png");
  // Perezoso incendiado
  slothFireImages[0] = loadImage(basePath + "perezosoincendio.png");
  //Pajaro incendiado
  birdFireImages[0] = loadImage(basePath + "pajaroquemado.png");
  //Tatu incendiado
  tatuFireImages[0] = loadImage(basePath + "tatuquemado.png");
  // Herramientas
  toolsImages[0] = loadImage(basePath + "botonpala.png");
  toolsImages[1] = loadImage(basePath + "botonagua.png");
  toolsImagesFilter[0] = loadImage(basePath + "botonpalafiltro.png");
  toolsImagesFilter[1] = loadImage(basePath + "botonaguafiltro.png");
  gameOverImage = loadImage(basePath + "gameover.png"); //
}

function setup() {
  createCanvas(1280, 720);
  frameRate(60);
  noSmooth(); // Quitar antiliasing

  // Crear árboles
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < numArboles; j++) {
      if (i % 2 === 0) {
        if (Math.random() < 0.4)
          arboles.push(
            new ObjetoInGame(80 * j - 10, 95 * i, treeImages[0], "arbol")
          );
        else if (Math.random() < 0.4)
          arboles.push(
            new ObjetoInGame(80 * j - 10, 95 * i, bushImage, "arbusto")
          );
      } else {
        if (Math.random() < 0.4)
          arboles.push(
            new ObjetoInGame(80 * j - 50, 95 * i, treeImages[0], "arbol")
          );
        else if (Math.random() < 0.4)
          arboles.push(
            new ObjetoInGame(80 * j - 50, 95 * i, bushImage, "arbusto")
          );
      }
    }
  }
  menuJuego1 = new MenuTools(width / 2 - 100, height - 110);
  menuJuego1.addTool(new ObjetoInGame(0, 0, toolsImages[0]));
  menuJuego1.addTool(new ObjetoInGame(0, 0, toolsImages[1]));
  menuJuego1.tools[0].spriteFilter = toolsImagesFilter[0];
  menuJuego1.tools[1].spriteFilter = toolsImagesFilter[1];
}

function draw() {
  if (!derrota) {
    switch (numeroJuego) {
      case 0:
        break;
      case 1:
        playMinijuego1();
        break;
      default:
        break;
    }
  }
}

function playMinijuego1() {
  // Actualizar score
  if (score >= limitScore) {
    limitScore = Math.floor(limitScore * 2.4 * 0.8);
    valNumAno++;
    textFecha = `aug-20${valNumAno}`;
    valorProbabilistico += 0.008;
  }

  background(255);

  const cantAnchoSuelo = Math.ceil(width / baseImage.width);
  const cantAltoSuelo = Math.ceil(height / baseImage.height);
  for (let i = 0; i < cantAltoSuelo; i++) {
    for (let j = 0; j < cantAnchoSuelo; j++) {
      image(baseImage, j * baseImage.width, i * baseImage.height);
    }
  }

  arboles.forEach((arbol) => arbol.dibujar());

  //Fuente y estilo de texto
  textFont(Texto || "Arial");
  textSize(20);
  fill(255);
  noStroke();
  strokeWeight(4);

  /*//Cuadro de textFont
  let boxX = 50,
    boxY = 50,
    boxWidth = 400,
    boxHeight = 100;
  //fill(0, 100, 200, 150);
  fill(0, 0, 200, 150);
  noStroke();
  rect(boxX, boxY, boxWidth, boxHeight, 20);
  //Escribir el texto ¡Bienvenida
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text("¡Bienvenido al Minijuego1!", boxX + boxWidth / 2, boxY + boxHeight / 2);
*/
  //textFecha
  fill(0);
  textAlign(RIGHT, BOTTOM);
  text(`${textFecha}`, width - 50, height - 45);

  //texto score
  fill(0);
  textAlign(RIGHT, BOTTOM);
  text(`Puntaje: ${textScore}`, width - 50, height - 10);

  let probabilidadAparecerAnimal = Math.random() < 0.001;
  if (probabilidadAparecerAnimal) {
    let indexArbol = Math.floor(Math.random() * arboles.length);
    let posX = arboles[indexArbol].x;
    let posY = arboles[indexArbol].y - 90;
    const animalRandom = getRandomAnimal();
    if (animalesEnCampo.length < 10 && parajosEnCampo.length < 10) {
      if (animalRandom === "perezoso") {
        /*
        animalesEnCampo.push(
          new AnimatedObject(posX, posY + 60, slothImage, 13, 10)
        );
        */
      } else if (animalRandom === "tatu") {
        /*animalesEnCampo.push(
          new AnimatedObject(posX, posY + 60, tatuFireImages[0], 16, 10)
        );*/
      } else if (animalRandom === "pajaro") {
        parajosEnCampo.push(
          new AnimatedObject(-100, posY + 60, birdImages[0], 3, 10)
        );
      }
    }
  }

  parajosEnCampo.forEach((element, index) => {
    element.x += 0.5;
    element.animate();
    if (element.x > width) {
      animalesEnCampo.splice(index, 1);
    }
  });

  let probabilidadAparecerFuego = Math.random() < valorProbabilistico;
  if (fuegos.length <= 0) {
    tiempoTranquilo++;
    if (tiempoTranquilo >= 300) {
      probabilidadAparecerFuego = Math.random() < 0.9;
      tiempoTranquilo = 0;
    } else {
      probabilidadAparecerFuego = Math.random() < 0.008;
    }
  }

  // probabilidad de incendio en arbol o arbusto
  if (probabilidadAparecerFuego) {
    let indexArbol = Math.floor(Math.random() * arboles.length);
    let posX = arboles[indexArbol].x;
    let posY = arboles[indexArbol].y - 90;
    if (!fuegos.some((f) => f.x === posX && f.y === posY)) {
      fuegos.push(new FireObject(posX, posY, fireImages[0], 4, 8, indexArbol));
    }
  }
  fuegos.forEach((fuego) => {
    fuego.animate();
    if (fuego.hasExceededTime() && fuego.bandera === false) {
      let animalMostrar = getRandomAnimal();
      if (animalMostrar === "perezoso") {
        animalesIncendiados.push(
          new AnimatedObject(fuego.x, fuego.y + 60, slothFireImages[0], 13, 10)
        );
      } else if (animalMostrar === "tatu") {
        tatusIncendiados.push(
          new AnimatedObject(fuego.x, fuego.y + 110, tatuFireImages[0], 16, 10)
        );
      } else if (animalMostrar === "pajaro") {
        pajarosIncendiados.push(
          new AnimatedObject(fuego.x, fuego.y + 60, birdFireImages[0], 3, 10)
        );
      }

      fuego.bandera = true;
    }
  });

  animalesIncendiados.forEach((element, index) => {
    element.animate();
    if (element.finished) {
      animalesIncendiados.splice(index, 1);
    }
  });
  pajarosIncendiados.forEach((element, index) => {
    element.animate();
    element.x += 0.5;
    if (element.x > width) {
      pajarosIncendiados.splice(index, 1);
    }
  });
  tatusIncendiados.forEach((element, index) => {
    element.animate();
    element.x += 0.5;
    if (element.finished) {
      tatusIncendiados.splice(index, 1);
    }
  });

  menuJuego1.dibujar();
  // (2017/200)*1 = trucn: 10; (2019/200)*2.5: 25; (2020/200)*3.5: 35;
  if (fuegos.length > 0.6 * arboles.length) {
    console.log(fuegos.length);
    image(gameOverImage, 350, 200);
  }
}

function mousePressed() {
  fuegos.forEach((fuego, index) => {
    if (fuego.isClicked(mouseX, mouseY)) {
      if (
        arboles[fuego.indexBottom].nameObject === "arbol" &&
        toolSelected === 1
      ) {
        score += 4 * multiplicadorPuntos;
        textScore = `${score}/${limitScore}`;
        fuegos.splice(index, 1);
      } else if (
        arboles[fuego.indexBottom].nameObject === "arbusto" &&
        toolSelected === 0
      ) {
        score += 3 * multiplicadorPuntos;
        textScore = `${score}/${limitScore}`;
        fuegos.splice(index, 1);
      }
    }
  });

  menuJuego1.tools.forEach((tool, index) => {
    if (tool.isClicked(mouseX, mouseY)) {
      menuJuego1.tools.forEach((tool) => {
        tool.clickedHold = false;
        toolSelected = null;
      });
      tool.clickedHold = true;
      toolSelected = index;
    }
  });
  console.log(menuJuego1.tools);
}
