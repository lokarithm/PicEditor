export class Rectangle {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(posX: number, posY: number, width: number, height: number) {
    this.ctx.fillRect(posX, posY, width, height);
  }
}
