import { Typography } from "@material-ui/core";
import * as React from "react";
import { Color, drawPixel } from "src/model/Color";
import { LoadingProps, LoadingState } from "src/model/LoadingModel";
import { add, dot, norm, scale, sub, Vector } from "src/model/Vectors";
import Page from "./Page";

interface IRayTracerState extends LoadingState {
  nFactor: number;
  spheres?: Sphere[];
}
// tslint:disable-next-line:no-empty-interface
interface IRayTracerProps extends LoadingProps {}

// tslint:disable-next-line:interface-name
interface Sphere {
  x: number;
  y: number;
  z: number;
  r: number;
  ambient: number[];
  diffuse: number[];
  specular: number[];
  n: number;
}

const E: Vector = {
  x: 0.5,
  y: 0.5,
  z: -0.5
};

function quadForm(a: number, b: number, c: number): number {
  const a2 = a + a;
  const b2 = 0 - b;
  const s = Math.sqrt(b * b - 4 * a * c);
  return Math.min((b2 + s) / a2, (b2 - s) / a2);
}

const lights = [
  {
    location: {
      x: 2,
      y: 4,
      z: -2
    },
    ambient: [1, 1, 1],
    diffuse: [1, 1, 1],
    specular: [1, 1, 1]
  }
];

export default class RayTracer extends Page<IRayTracerProps, IRayTracerState> {
  private canvas: HTMLCanvasElement;
  constructor(p: IRayTracerProps) {
    super(p);
    this.state = { loading: true, nFactor: 15 };
  }

  public onLoad(): void {
    this.get("./spheres.json", (data: Sphere[]) => {
      this.setState({ ...this.state, spheres: data }, this.draw);
    });
  }

  public renderPostLoad(): JSX.Element {
    return (
      <div style={{ textAlign: "center" }}>
        <Typography component="h2" variant="h1" gutterBottom={true}>
          This page is still in development and may not work properly
        </Typography>

        <canvas
          style={{
            backgroundColor: "black",
            margin: 0,
            marginTop: "5vh",
            height: this.getSize(),
            width: this.getSize()
          }}
          ref={(canvas: HTMLCanvasElement) => (this.canvas = canvas)}
        />
      </div>
    );
  }

  protected resize() {
    this.setState((current: IRayTracerState) => current);
  }

  private getContext(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d")!;
  }

  private getSize(): number {
    return Math.floor(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      ) * 0.9
    );
  }

  private draw() {
    let { nFactor } = this.state;
    nFactor = nFactor % 2 === 0 ? nFactor + 1 : nFactor;
    const dim = this.getSize() / 4;
    const dInv = 1 / dim;
    const imagedata = this.getContext().createImageData(dim, dim);
    this.log({ height: imagedata.height });
    const startTime = new Date().getTime();
    for (let x = 0; x < dim - 1; x++) {
      for (let y = 0; y < dim - 1; y++) {
        const pixel = { x: x * dInv, y: 1 - y * dInv, z: 0 };
        this.state.spheres!.forEach((sphere: Sphere) => {
          const calc = {
            circle: sphere,
            r: sphere.r,
            C: { x: sphere.x, y: sphere.y, z: sphere.z },
            P: pixel,
            D: {} as Vector,
            e_min_c: {} as Vector,
            a: 0,
            b: 0,
            c: 0,
            dis: 0,
            inter: {} as Vector
          };
          calc.D = sub(calc.P, E);
          calc.e_min_c = sub(E, calc.C);
          calc.a = dot(calc.D, calc.D);
          calc.b = 2 * dot(calc.D, calc.e_min_c);
          calc.c = dot(calc.e_min_c, calc.e_min_c) - calc.r * calc.r;
          calc.dis = calc.b * calc.b - 4 * calc.a * calc.c;
          if (calc.dis > 0) {
            const t = quadForm(calc.a, calc.b, calc.c);
            if (t <= 1) {
              return;
            }
            calc.inter = add(E, scale(calc.D, t));
            if (true) {
              const light = lights[0];
              const I = {
                val: [0, 0, 0],
                La: light.ambient,
                Ld: light.diffuse,
                Ls: light.specular,
                Ka: sphere.ambient,
                Kd: sphere.diffuse,
                Ks: sphere.specular,
                nNorm: {} as Vector,
                lNorm: {} as Vector,
                R: {} as Vector,
                V: {} as Vector,
                n: 0,
                n_dot_l: 0
              };
              /* N = Vector Normal to the surface */
              I.nNorm = norm(sub(calc.C, calc.inter));
              /*L = Vector From the Surface to the light source */
              I.lNorm = norm(sub(calc.inter, light.location));
              // R = 2N(N*L)-L
              I.R = sub(scale(I.nNorm, 2 * dot(I.nNorm, I.lNorm)), I.lNorm);
              /* V = Vector from the Surface to the eye */
              I.V = norm(sub(calc.inter, E));
              I.n = sphere.n * nFactor;
              I.n_dot_l = dot(I.nNorm, I.lNorm);
              [0, 1, 2].forEach((a: number) => {
                I.val[a] +=
                  Math.max(I.La[a] * I.Ka[a], 0) +
                  Math.max(I.Ld[a] * I.Kd[a] * I.n_dot_l, 0) +
                  Math.max(
                    I.Ls[a] * I.Ks[a] * Math.pow(dot(norm(I.R), I.V), I.n),
                    0
                  );
              });
              drawPixel(
                imagedata,
                x,
                y,
                new Color(255 * I.val[0], 255 * I.val[1], 255 * I.val[2], 255)
              );
            } else {
              drawPixel(
                imagedata,
                x,
                y,
                new Color(
                  sphere.diffuse[0] * 255,
                  sphere.diffuse[1] * 255,
                  sphere.diffuse[2] * 255,
                  255
                )
              );
            }
          }
        });
      }
    }
    this.getContext().putImageData(imagedata, 0, 0);
    this.log("Took", new Date().getTime() - startTime, "ms to process");
  }
}
