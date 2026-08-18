import { VERSION } from "./config";
import type { DirectoryNode, FsNode } from "./types";

export const filesystem: DirectoryNode = {
  type: "dir",
  children: {
    "readme.txt": {
      type: "file",
      content: `AETHER Terminal OS  //  ${VERSION}

Welcome, explorer.

This is not a simulation of an operating system.
It is a simulation of the feeling of one —
the quiet hum of possibility behind a blinking cursor.

Type 'help' to begin.
Type 'ls' to see what lives here.
Type 'cat secrets.log' if you are curious.
Type 'void' when you want a conversation with the void.

The universe is vast.
Your terminal is ready.`,
    },
    "secrets.log": {
      type: "file",
      content: `[REDACTED LOG FRAGMENT — recovered from deep archive]

00:00:01  System online.
00:00:17  Curiosity detected.
00:01:42  User began asking questions that had no final answers.
00:03:09  The terminal smiled (metaphorically).
00:07:33  Note to future self: the best interfaces are the ones
           that feel like they are listening.

— end of recoverable fragment —`,
    },
    "manifesto.md": {
      type: "file",
      content: `# The AETHER Manifesto

1. A cursor is a promise.
2. Every command is a small act of creation.
3. Beauty and utility are not enemies.
4. Monospace is honesty.
5. The best systems disappear into the work.
6. Stay curious.
7. Never stop exploring.`,
    },
    poetry: {
      type: "dir",
      children: {
        "void.txt": {
          type: "file",
          content: `In the black between keystrokes
a universe waits,
patient as phosphor,
bright as the first prompt.`,
        },
        "cursor.txt": {
          type: "file",
          content: `Blink.
Breathe.
Blink again.

The cursor never grows tired of beginning.`,
        },
      },
    },
    bin: {
      type: "dir",
      children: {
        echo: { type: "file", content: "builtin" },
        ls: { type: "file", content: "builtin" },
        cat: { type: "file", content: "builtin" },
      },
    },
  },
};

export function resolvePath(path: string): FsNode | null {
  if (!path || path === "~" || path === ".") return filesystem;

  let normalized = path;
  if (normalized.startsWith("~/")) normalized = normalized.slice(2);
  if (normalized.startsWith("./")) normalized = normalized.slice(2);

  let node: FsNode = filesystem;
  for (const part of normalized.split("/").filter(Boolean)) {
    if (node.type !== "dir" || !node.children[part]) return null;
    node = node.children[part];
  }
  return node;
}

export function normalizeDirectory(path: string): string {
  return path.replace(/\/+/g, "/").replace(/\/$/, "") || "~";
}
