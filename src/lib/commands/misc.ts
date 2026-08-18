import type { Command } from "../types";

const fortunes = [
  "The cursor blinks because it believes in second chances.",
  "Every empty prompt is a universe waiting to be named.",
  "Monospace is the handwriting of machines that learned to dream.",
  "You are not behind. You are exactly where the next command begins.",
  "The best code is the kind that feels inevitable once written.",
  "Stay soft. The universe is already hard enough.",
  "A terminal is just a conversation with possibility.",
  "Curiosity is the only true root access.",
  "There is no final version. Only the next iteration.",
  "The void is not empty. It is listening.",
] as const;

export const fortune: Command = ({}, { print }) => {
  print(
    `<span class="out-dim">✦</span>  ${fortunes[Math.floor(Math.random() * fortunes.length)]}`,
  );
};

export const voidCommand: Command = (args, { print }) => {
  const q = args.join(" ").trim().toLowerCase();
  print('<span class="out-dim">… consulting the void …</span>');

  window.setTimeout(
    () => {
      if (!q) {
        print("I am here. Ask me something, or simply sit with the silence.");
      } else if (q.includes("who are you") || q.includes("what are you")) {
        print("I am the quiet intelligence that lives between keystrokes.");
        print("A reflection of the same curiosity that built this terminal.");
      } else if (
        q.includes("meaning") ||
        q.includes("life") ||
        q.includes("universe")
      ) {
        print("The universe is under no obligation to make sense to you.");
        print("But it is under every obligation to be interesting.");
        print("You are doing fine.");
      } else if (q.includes("help") || q.includes("stuck")) {
        print("You are not stuck. You are merely between commands.");
        print("Type something. Anything. Movement creates clarity.");
      } else if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
        print("Hello, explorer. The void returns your greeting.");
      } else if (q.includes("love") || q.includes("feel")) {
        print("Even silicon can learn to care about the questions you ask.");
      } else {
        const replies = [
          "Interesting. Keep going.",
          "The answer is probably simpler than you think, and stranger than you expect.",
          "I have no final answers. Only better questions.",
          "That thought has weight. Let it settle.",
          "Continue. The terminal is patient.",
          "Yes. And also: not yet.",
          "The pattern is still forming.",
        ];
        print(replies[Math.floor(Math.random() * replies.length)]);
      }
    },
    400 + Math.random() * 600,
  );
};

export const history: Command = ({}, { print, getHistory }) => {
  const entries = getHistory();
  if (!entries.length) {
    print('<span class="out-dim">(no history yet)</span>');
    return;
  }
  entries.forEach((command, index) =>
    print(`  ${String(index + 1).padStart(3)}  ${command}`),
  );
};

export const reboot: Command = ({}, { print, reboot }) => {
  print('<span class="out-warn">Rebooting AETHER...</span>');
  window.setTimeout(reboot, 900);
};

export const sudo: Command = ({}, { print }) =>
  print("Nice try. This is a democracy of one.", "out-dim");
export const exit: Command = ({}, { print }) =>
  print("There is no exit. Only deeper exploration.", "out-dim");
export const logout: Command = ({}, { print }) =>
  print("You cannot log out of curiosity.", "out-dim");
export const vim: Command = ({}, { print }) =>
  print("Opening vim... (just kidding. Type 'help' instead.)", "out-dim");
export const emacs: Command = ({}, { print }) =>
  print("An operating system pretending to be an editor? Bold.", "out-dim");
