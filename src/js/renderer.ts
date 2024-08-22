import * as PIXI from "pixi.js";

const BACKGROUND_COLOR = 0x000000;

class Renderer {
  private readonly app = new PIXI.Application();

  public async initialize(parent: HTMLElement) {
    await this.app.init({
      backgroundColor: BACKGROUND_COLOR,
      hello: true,
      resizeTo: parent,
    });

    new ResizeObserver(() => {
      this.app.resizeTo = parent;
      this.app.resize();
    }).observe(parent);

    this.appendToHTML(parent);
  }

  public flush() {
    this.app.stage.removeChildren();
    this.app.renderer.render(this.app.stage);
  }

  public flushRectangle(x: number, width: number) {
    const rectangle = new PIXI.Graphics();

    rectangle.rect(x, 0, width, this.app.renderer.height);
    rectangle.fill(BACKGROUND_COLOR);

    this.app.stage.addChild(rectangle);
  }

  public addRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.flushRectangle(x, width);
    const rectangle = new PIXI.Graphics();

    rectangle.rect(x, y, width - 1, height);
    rectangle.fill(color);

    this.app.stage.addChild(rectangle);
  }

  get canvas() {
    return this.app.canvas;
  }

  private appendToHTML(appendToElement: HTMLElement) {
    appendToElement.appendChild(this.canvas);
  }
}

export { Renderer };
