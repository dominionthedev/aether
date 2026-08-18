export class TerminalState {
  private history: string[] = [];
  private currentDir = "~";
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

  isMatrixActive(): boolean {
    return this.matrixActive;
  }
  setMatrixActive(active: boolean): void {
    this.matrixActive = active;
  }
}
