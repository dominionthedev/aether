import type { TerminalElements } from "./types";

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`AETHER: missing required element ${selector}`);
  return element;
}

export function getTerminalElements(): TerminalElements {
  return {
    boot: required<HTMLElement>("#boot"),
    bootLogo: required<HTMLElement>("#boot-logo"),
    bootLog: required<HTMLElement>("#boot-log"),
    terminal: required<HTMLElement>("#terminal"),
    output: required<HTMLElement>("#output"),
    commandLine: required<HTMLInputElement>("#cmdline"),
    prompt: required<HTMLElement>("#prompt"),
    cursor: required<HTMLElement>("#cursor"),
  };
}

export function focusCommandLine(input: HTMLInputElement): void {
  if (document.activeElement !== input) input.focus();
}
