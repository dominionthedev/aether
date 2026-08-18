import type { Font, Theme } from "./types";

export class TerminalState {
  private history: string[] = [];
  private currentDir = "~";
  private theme: Theme = "green";
  private font: Font = "ibm";
  private matrixActive = false;

  getHistory(): readonly string[] {
    return this.history;
  }
  addHistory(command: string): void {
    this.history.push(command);
  }

  getCurrentDir(): string {
    return this.currentDir;
  }
  setCurrentDir(dir: string): void {
    this.currentDir = dir;
  }

  getTheme(): Theme {
    return this.theme;
  }
  setTheme(theme: Theme): void {
    this.theme = theme;
  }

  getFont(): Font {
    return this.font;
  }
  setFont(font: Font): void {
    this.font = font;
  }

  isMatrixActive(): boolean {
    return this.matrixActive;
  }
  setMatrixActive(active: boolean): void {
    this.matrixActive = active;
  }
}
