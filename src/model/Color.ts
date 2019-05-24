export class Color {
  private r: number;
  private g: number;
  private b: number;
  private a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.setR(r);
    this.setG(g);
    this.setB(b);
    this.setA(a);
  }

  public change(r: number, g: number, b: number, a: number) {
    this.setR(r);
    this.setG(g);
    this.setB(b);
    this.setA(a);
  }

  public getR(): number {
    return this.r;
  }

  public getG(): number {
    return this.g;
  }

  public getB(): number {
    return this.b;
  }

  public getA(): number {
    return this.a;
  }

  public setR(val: number): void {
    if (val > 255) {
      throw new Error("Must Be Between 0 and 255!");
    }
    this.r = val;
  }

  public setG(val: number): void {
    if (val > 255) {
      throw new Error("Must Be Between 0 and 255!");
    }
    this.b = val;
  }

  public setB(val: number): void {
    if (val > 255) {
      throw new Error("Must Be Between 0 and 255!");
    }
    this.g = val;
  }

  public setA(val: number): void {
    if (val > 255) {
      throw new Error("Must Be Between 0 and 255!");
    }
    this.a = val;
  }
}

export function drawPixel(
  imagedata: ImageData,
  x: number,
  y: number,
  color: Color
) {
  if (x < 0 || y < 0 || x >= imagedata.width || y >= imagedata.height) {
    throw new Error("drawPixel location outside of image");
  } else {
    const pixelIndex = (y * imagedata.width + x) * 4;
    imagedata.data[pixelIndex] = color.getR();
    imagedata.data[pixelIndex + 1] = color.getG();
    imagedata.data[pixelIndex + 2] = color.getB();
    imagedata.data[pixelIndex + 3] = color.getA();
  }
}
