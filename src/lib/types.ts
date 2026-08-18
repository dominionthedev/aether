export interface FileNode {
  type: "file";
  content: string;
}

export interface DirectoryNode {
  type: "dir";
  children: Record<string, FileNode | DirectoryNode>;
}

export type FsNode = FileNode | DirectoryNode;

export interface TerminalElements {
  boot: HTMLElement;
  bootLogo: HTMLElement;
  bootLog: HTMLElement;
  terminal: HTMLElement;
  output: HTMLElement;
  commandLine: HTMLInputElement;
  prompt: HTMLElement;
  cursor: HTMLElement;
}

export interface CommandContext {
  print: (text?: string, className?: string) => void;
  printRaw: (text: string) => void;
  clear: () => void;
  getPrompt: () => string;
  getCurrentDir: () => string;
  setCurrentDir: (dir: string) => void;
  getHistory: () => readonly string[];
  matrix: () => boolean;
  reboot: () => void;
}

export type Command = (args: string[], context: CommandContext) => void;
