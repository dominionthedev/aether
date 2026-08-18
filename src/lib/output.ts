import type { TerminalElements } from "./types";

export class TerminalOutput {
  constructor(private readonly elements: TerminalElements) {}

  print(text = "", className = ""): void {
    const line = document.createElement("div");
    if (className) line.className = className;
    line.innerHTML = text;
    this.elements.output.appendChild(line);
    this.scrollToBottom();
  }

  printRaw(text: string): void {
    const pre = document.createElement("pre");
    pre.className = "out-ascii";
    pre.textContent = text;
    this.elements.output.appendChild(pre);
    this.scrollToBottom();
  }

  clear(): void {
    this.elements.output.replaceChildren();
  }

  private scrollToBottom(): void {
    this.elements.output.scrollTop = this.elements.output.scrollHeight;
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
