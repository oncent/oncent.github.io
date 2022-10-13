import { Bounce, Cubic, Linear, Quad, type CurveFunction } from "./cubzier";

export class Animation {
  constructor(
    public from: number,
    public to: number,
    public duration: number, //s
    private callback: (v: number) => void = () => undefined,
    private curve: CurveFunction = Linear
  ) {}
  private runner?: number;
  start() {
    const fps = 60;

    let t = 0;
    let start = this.from;
    const run = () => {
      const next = this.curve(t, this.from, this.to - this.from, this.duration);
      if (t > this.duration) {
        this.callback(this.to);
        return;
      }
      t += 1 / fps;
      start = next;
      this.callback(start);
      this.runner = window.requestAnimationFrame(run);
    };
    run();
  }
  stop() {
    if (this.runner !== undefined) window.cancelAnimationFrame(this.runner);
  }
}
