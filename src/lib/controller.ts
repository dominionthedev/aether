import { HOST, USER } from "./config";
import { createCommands } from "./commands";
import { MatrixRain } from "./matrix";
import { TerminalOutput, escapeHtml } from "./output";
import { TerminalState } from "./state";
import { focusCommandLine } from "./view";
import type { CommandContext, Font, Theme, TerminalElements } from "./types";

export class TerminalController {
  private readonly output: TerminalOutput;
  private readonly state = new TerminalState();
  private readonly matrix = new MatrixRain();
  private readonly commands;
  private historyIndex = -1;

  constructor(private readonly elements: TerminalElements) {
    this.output = new TerminalOutput(elements);
    this.commands = createCommands({
      clear: () => this.output.clear(),
      matrix: () => this.toggleMatrix(),
    });
  }

  start(): void {
    this.applyTheme(this.state.getTheme());
    this.applyFont(this.state.getFont());
    this.updatePrompt();
    this.bindInput();
  }

  getOutput(): TerminalOutput {
    return this.output;
  }

  private context(): CommandContext {
    return {
      print: (text, className) => this.output.print(text, className),
      printRaw: (text) => this.output.printRaw(text),
      clear: () => this.output.clear(),
      getPrompt: () => this.getPrompt(),
      getCurrentDir: () => this.state.getCurrentDir(),
      setCurrentDir: (dir) => this.state.setCurrentDir(dir),
      getTheme: () => this.state.getTheme(),
      setTheme: (theme) => this.applyTheme(theme),
      getFont: () => this.state.getFont(),
      setFont: (font) => this.applyFont(font),
      getHistory: () => this.state.getHistory(),
      matrix: () => this.toggleMatrix(),
      reboot: () => location.reload(),
    };
  }

  private getPrompt(): string {
    const currentDir = this.state.getCurrentDir();
    const shortDir = currentDir === "~" ? "~" : currentDir.split("/").pop();
    return `${USER}@${HOST}:${shortDir}$ `;
  }

  private updatePrompt(): void {
    this.elements.prompt.textContent = this.getPrompt();
  }

  private applyTheme(theme: Theme): void {
    document.body.classList.remove(`theme-${this.state.getTheme()}`);
    document.body.classList.add(`theme-${theme}`);
    this.state.setTheme(theme);
  }

  private applyFont(font: Font): void {
    document.body.classList.remove(`font-${this.state.getFont()}`);
    document.body.classList.add(`font-${font}`);
    this.state.setFont(font);
  }

  private toggleMatrix(): boolean {
    const active = this.matrix.toggle();
    this.state.setMatrixActive(active);
    return active;
  }

  private processCommand(raw: string): void {
    const line = raw.trim();
    if (!line) return;

    this.state.addHistory(line);
    this.historyIndex = this.state.getHistory().length;

    this.output.print(
      `<span class="out-dim">${escapeHtml(this.getPrompt())}</span><span class="out-cmd">${escapeHtml(line)}</span>`,
    );

    const [commandName, ...args] = line.split(/\s+/);
    const command = this.commands[commandName.toLowerCase()];

    if (!command) {
      this.output.print(
        `aether-sh: command not found: ${escapeHtml(commandName)}`,
        "out-error",
      );
      this.output.print(
        'Type <span class="out-cmd">help</span> for available commands.',
      );
      return;
    }

    command(args, this.context());
    this.updatePrompt();
  }

  private bindInput(): void {
    const input = this.elements.commandLine;

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const value = input.value;
        input.value = "";
        this.processCommand(value);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const history = this.state.getHistory();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          input.value = history[this.historyIndex] ?? "";
        }
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const history = this.state.getHistory();
        if (this.historyIndex < history.length - 1) {
          this.historyIndex++;
          input.value = history[this.historyIndex] ?? "";
        } else {
          this.historyIndex = history.length;
          input.value = "";
        }
        return;
      }

      if (event.key === "c" && event.ctrlKey) {
        event.preventDefault();
        this.output.print(
          `<span class="out-dim">${escapeHtml(this.getPrompt())}</span>${escapeHtml(input.value)}^C`,
        );
        input.value = "";
        return;
      }

      if (event.key === "l" && event.ctrlKey) {
        event.preventDefault();
        this.output.clear();
      }
    });

    document.addEventListener("click", () => focusCommandLine(input));
    document.addEventListener("keydown", () => focusCommandLine(input));
  }
}
