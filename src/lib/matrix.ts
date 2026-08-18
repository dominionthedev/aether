export class MatrixRain {
  private canvas: HTMLCanvasElement | null = null;
  private animationFrame: number | null = null;
  private resizeHandler: (() => void) | null = null;

  get active(): boolean {
    return this.canvas !== null;
  }

  start(): void {
    if (this.active) return;

    const crt = document.querySelector<HTMLElement>("#crt");
    if (!crt) return;

    const canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    crt.appendChild(canvas);
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      this.stop();
      return;
    }

    const fontSize = 14;
    const chars =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF";
    let columns = 0;
    let drops: number[] = [];

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    resize();
    this.resizeHandler = resize;
    window.addEventListener("resize", resize);

    const draw = (): void => {
      ctx.fillStyle = "rgba(10, 12, 15, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle =
        getComputedStyle(document.body).getPropertyValue("--fg").trim() ||
        "#33ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }

      this.animationFrame = requestAnimationFrame(draw);
    };

    draw();
  }

  stop(): void {
    if (this.animationFrame !== null) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
    this.canvas?.remove();
    this.canvas = null;

    if (this.resizeHandler)
      window.removeEventListener("resize", this.resizeHandler);
    this.resizeHandler = null;
  }

  toggle(): boolean {
    if (this.active) this.stop();
    else this.start();
    return this.active;
  }
}
