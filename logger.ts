import { createLogger } from "@lvksh/logger";
import chalk from "chalk";

export const log = createLogger(
  {
    ok: {
      label: chalk.greenBright`[OK]`,
      newLine: "| ",
      newLineEnd: "\\-",
    },
    debug: chalk.magentaBright`[DEBUG]`,
    info: {
      label: chalk.cyan`[INFO]`,
      newLine: chalk.cyan`⮡`,
      newLineEnd: chalk.cyan`⮡`,
    },
    warn: {
      label: chalk.yellowBright`[WARN]`,
      newLine: chalk.yellowBright`⮡`,
      newLineEnd: chalk.yellowBright`⮡`,
    },
    error: {
        label: chalk.redBright`[ERROR]`,
        newLine: chalk.redBright`⮡`,
        newLineEnd: chalk.redBright`⮡`,
    },
    tip: {
        label: chalk.blueBright`[TIP]`,
        newLine: chalk.blueBright`⮡`,
        newLineEnd: chalk.blueBright`⮡`,
    },
    docs: {
      label: chalk.magenta `[DOCS]`,
      newLine: chalk.magenta`⮡`,
      newLineEnd: chalk.magenta`⮡`,
  },
  },
  { padding: "PREPEND" },
  console.log
);
