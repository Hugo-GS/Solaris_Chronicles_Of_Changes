function animateSprite(spriteKey, x, y, scale = 1) {
  let data = frameData[spriteKey];

  if (!data || !data.sprite) return;

  // Calcular las dimensiones del frame a escala
  let scaledWidth = data.frameWidth * scale;
  let scaledHeight = data.frameHeight * scale;

  // Coordenada X del frame actual
  let frameX = data.currentFrame * data.frameWidth;

  // Dibujar el frame correspondiente del sprite
  image(
    data.sprite,
    x,
    y, // Posición en el canvas
    scaledWidth,
    scaledHeight, // Dimensiones en pantalla
    frameX,
    0, // Coordenadas dentro de la imagen original
    data.frameWidth,
    data.frameHeight // Tamaño del frame original
  );

  // Actualizar el contador de tiempo para la animación
  data.frameTimer++;
  if (data.frameTimer >= data.animationSpeed) {
    // Avanzar al siguiente frame
    data.currentFrame = (data.currentFrame + 1) % data.totalFrames;
    data.frameTimer = 0;
  }
}
