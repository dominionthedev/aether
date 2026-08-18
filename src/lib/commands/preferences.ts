import { FONTS, THEMES } from "../config";
import type { Command, Font, Theme } from "../types";

export const theme: Command = (args, { print, getTheme, setTheme }) => {
  if (!args[0]) {
    print(`Current theme: <span class="out-cmd">${getTheme()}</span>`);
    print(`Available: ${THEMES.join(", ")}`);
    return;
  }

  const value = args[0].toLowerCase() as Theme;
  if (!THEMES.includes(value)) {
    print(`Unknown theme: ${args[0]}`, "out-error");
    print(`Available: ${THEMES.join(", ")}`);
    return;
  }

  setTheme(value);
  print(`Theme set to <span class="out-success">${value}</span>`);
};

export const font: Command = (args, { print, getFont, setFont }) => {
  if (!args[0]) {
    const current = getFont();
    print(
      `Current font: <span class="out-cmd">${current}</span> (${FONTS[current]})`,
    );
    print("Available:");
    for (const [key, value] of Object.entries(FONTS))
      print(`  ${key.padEnd(12)} → ${value}`);
    return;
  }

  const value = args[0].toLowerCase() as Font;
  if (!(value in FONTS)) {
    print(`Unknown font: ${args[0]}`, "out-error");
    return;
  }

  setFont(value);
  print(`Font set to <span class="out-success">${FONTS[value]}</span>`);
};
