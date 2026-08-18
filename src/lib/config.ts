import type { Font, Theme } from "./types";

export const USER = "explorer";
export const HOST = "aether";
export const KERNEL = "void-0.1";
export const VERSION = "1.0.0";
export const BOOT_DELAY = 45;

export const THEMES: readonly Theme[] = [
  "green",
  "amber",
  "cyan",
  "magenta",
  "white",
];

export const FONTS: Record<Font, string> = {
  ibm: "IBM Plex Mono",
  jetbrains: "JetBrains Mono",
  inconsolata: "Inconsolata",
  source: "Source Code Pro",
  commit: "Commit Mono",
  victor: "Victor Mono",
  system: "System Mono",
};

export const LOGO = `
    █████╗ ███████╗████████╗██╗  ██╗███████╗██████╗ 
   ██╔══██╗██╔════╝╚══██╔══╝██║  ██║██╔════╝██╔══██╗
   ███████║█████╗     ██║   ███████║█████╗  ██████╔╝
   ██╔══██║██╔══╝     ██║   ██╔══██║██╔══╝  ██╔══██╗
   ██║  ██║███████╗   ██║   ██║  ██║███████╗██║  ██║
   ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
              T E R M I N A L   O S
                   v${VERSION}
`;

export const BOOT_MESSAGES = [
  "Initializing the void...",
  "Loading monospaced consciousness...",
  "Mounting /dev/curiosity...",
  "Calibrating phosphor glow...",
  "Restoring session from the void...",
  "Checking integrity of wonder...",
  "Starting aether-sh...",
  "System ready.",
] as const;
