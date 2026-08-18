import { HOST, USER, VERSION, KERNEL, CREATOR, CREATOR_URL } from "../config";
import type { Command } from "../types";

const art = `
        █████╗ ███████╗████████╗██╗  ██╗███████╗██████╗ 
       ██╔══██╗██╔════╝╚══██╔══╝██║  ██║██╔════╝██╔══██╗
       ███████║█████╗     ██║   ███████║█████╗  ██████╔╝
       ██╔══██║██╔══╝     ██║   ██╔══██║██╔══╝  ██╔══██╗
       ██║  ██║███████╗   ██║   ██║  ██║███████╗██║  ██║
       ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`;

export const about: Command = ({}, { print }) => {
  print(`<span class="out-header">AETHER Terminal OS</span>  v${VERSION}`);
  print("");
  print("A living terminal interface.");
  print("Designed as a quiet place for curiosity.");
  print("");
  print("Built with intention.");
  print("No backend. No tracking. Just you and the cursor.");
  print("");
  print(`<span class="out-dim">Built by ${CREATOR} — ${CREATOR_URL}</span>`);
};

export const neofetch: Command = ({}, { print, printRaw }) => {
  printRaw(art);
  print("");
  print(
    `  <span class="out-cmd">OS</span>       AETHER Terminal OS ${VERSION}`,
  );
  print(`  <span class="out-cmd">Host</span>     ${HOST}`);
  print(`  <span class="out-cmd">User</span>     ${USER}`);
  print('  <span class="out-cmd">Shell</span>    aether-sh');
  print(
    '  <span class="out-cmd">Uptime</span>   ∞ (or until you close the tab)',
  );
  print(`  <span class="out-cmd">Kernel</span>   ${KERNEL}`);
  print(`  <span class="out-cmd">Built by</span> ${CREATOR}`);
};

export const pwd: Command = ({}, { print, getCurrentDir }) =>
  print(getCurrentDir());
export const whoami: Command = ({}, { print }) => print(USER);
export const date: Command = ({}, { print }) => print(new Date().toString());
export const echo: Command = (args, { print }) => print(args.join(" "));
