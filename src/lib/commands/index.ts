import { help } from "./help";
import { cat, cd, ls } from "./filesystem";
import { about, date, echo, neofetch, pwd, whoami } from "./system";
import {
  emacs,
  exit,
  fortune,
  history,
  logout,
  reboot,
  sudo,
  vim,
  voidCommand,
} from "./misc";
import type { Command } from "../types";

export type CommandMap = Record<string, Command>;

export function createCommands(dependencies: {
  clear: Command;
  matrix: Command;
}): CommandMap {
  return {
    help,
    clear: dependencies.clear,
    cls: dependencies.clear,
    about,
    neofetch,
    ls,
    cd,
    cat,
    pwd,
    whoami,
    date,
    echo,
    matrix: dependencies.matrix,
    fortune,
    void: voidCommand,
    history,
    reboot,
    sudo,
    exit,
    logout,
    vim,
    emacs,
  };
}
