import { FONTS, THEMES } from "../config";
import type { Command } from "../types";

export const help: Command = ({}, { print }) => {
  print('<span class="out-header">AETHER COMMANDS</span>');
  print("");
  print('  <span class="out-cmd">help</span>          Show this list');
  print(
    '  <span class="out-cmd">clear</span> / <span class="out-cmd">cls</span>   Clear the terminal',
  );
  print('  <span class="out-cmd">about</span>         About this system');
  print('  <span class="out-cmd">neofetch</span>      System information');
  print('  <span class="out-cmd">ls</span> [path]     List directory contents');
  print('  <span class="out-cmd">cd</span> [path]     Change directory');
  print('  <span class="out-cmd">cat</span> <file>    Read a file');
  print('  <span class="out-cmd">pwd</span>           Print working directory');
  print('  <span class="out-cmd">whoami</span>        Current user');
  print('  <span class="out-cmd">date</span>          Current time');
  print('  <span class="out-cmd">echo</span> [text]   Echo arguments');
  print('  <span class="out-cmd">theme</span> [name]  Change color theme');
  print('  <span class="out-cmd">font</span> [name]   Change typeface');
  print('  <span class="out-cmd">matrix</span>        Toggle matrix rain');
  print('  <span class="out-cmd">fortune</span>       A small piece of wisdom');
  print('  <span class="out-cmd">void</span>          Speak with the void');
  print('  <span class="out-cmd">history</span>       Command history');
  print('  <span class="out-cmd">reboot</span>        Restart the system');
  print("");
  print(`<span class="out-dim">Themes: ${THEMES.join(", ")}</span>`);
  print(
    `<span class="out-dim">Fonts:  ${Object.keys(FONTS).join(", ")}</span>`,
  );
};
