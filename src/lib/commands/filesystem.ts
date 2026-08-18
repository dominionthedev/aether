import { resolvePath, normalizeDirectory } from "../filesystem";
import type { Command } from "../types";

export const ls: Command = (args, { print, getCurrentDir }) => {
  const path = args[0] || getCurrentDir();
  const node = resolvePath(path === "." ? getCurrentDir() : path);
  if (!node) {
    print(
      `ls: cannot access '${path}': No such file or directory`,
      "out-error",
    );
    return;
  }
  if (node.type === "file") {
    print(path.split("/").pop());
    return;
  }
  const names = Object.keys(node.children).sort();
  if (!names.length) {
    print('<span class="out-dim">(empty)</span>');
    return;
  }
  for (const name of names) {
    print(
      node.children[name].type === "dir"
        ? `<span class="out-cmd">${name}/</span>`
        : name,
    );
  }
};

export const cd: Command = (args, { print, getCurrentDir, setCurrentDir }) => {
  const target = args[0] || "~";
  const currentDir = getCurrentDir();

  if (target === "~" || target === "/") {
    setCurrentDir("~");
    return;
  }

  if (target === "..") {
    if (currentDir === "~") return;
    const parts = currentDir.split("/");
    parts.pop();
    setCurrentDir(parts.join("/") || "~");
    return;
  }

  let newPath =
    target.startsWith("~") || target.startsWith("/")
      ? target
      : currentDir === "~"
        ? `~/${target}`
        : `${currentDir}/${target}`;

  newPath = normalizeDirectory(newPath);
  if (!newPath.startsWith("~")) newPath = `~/${newPath}`;

  const node = resolvePath(newPath);
  if (!node || node.type !== "dir") {
    print(`cd: no such directory: ${target}`, "out-error");
    return;
  }
  setCurrentDir(newPath);
};

export const cat: Command = (args, { print, printRaw, getCurrentDir }) => {
  if (!args[0]) {
    print("cat: missing file operand", "out-error");
    return;
  }

  let path = args[0];
  if (!path.startsWith("~") && !path.startsWith("/")) {
    const currentDir = getCurrentDir();
    path = currentDir === "~" ? `~/${path}` : `${currentDir}/${path}`;
  }

  const node = resolvePath(path);
  if (!node) {
    print(`cat: ${args[0]}: No such file or directory`, "out-error");
    return;
  }
  if (node.type === "dir") {
    print(`cat: ${args[0]}: Is a directory`, "out-error");
    return;
  }
  printRaw(node.content);
};
