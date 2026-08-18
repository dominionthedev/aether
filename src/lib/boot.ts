import { BOOT_DELAY, BOOT_MESSAGES, LOGO } from "./config";
import { TerminalController } from "./controller";
import { getTerminalElements } from "./view";

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

export async function boot(): Promise<void> {
  const elements = getTerminalElements();
  const controller = new TerminalController(elements);
  controller.start();

  elements.bootLogo.textContent = LOGO;

  for (const message of BOOT_MESSAGES) {
    await sleep(280 + Math.random() * 180 + BOOT_DELAY);
    const line = document.createElement("div");
    line.className = "boot-line";
    line.textContent = `  › ${message}`;
    elements.bootLog.appendChild(line);
  }

  await sleep(700);
  elements.boot.classList.add("hidden");
  elements.terminal.classList.remove("hidden");
  elements.commandLine.focus();

  const output = controller.getOutput();
  output.print('<span class="out-success">Welcome to AETHER</span>');
  output.print(
    'Type <span class="out-cmd">help</span> to see available commands.',
  );
  output.print(
    'Type <span class="out-cmd">cat readme.txt</span> for a proper introduction.',
  );
  output.print("");
}
