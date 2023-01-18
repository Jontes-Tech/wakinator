var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { createLogger } from "@lvksh/logger";
import chalk from "chalk";
export var log = createLogger({
    ok: {
        label: chalk.greenBright(templateObject_1 || (templateObject_1 = __makeTemplateObject(["[OK]"], ["[OK]"]))),
        newLine: "| ",
        newLineEnd: "\\-"
    },
    debug: chalk.magentaBright(templateObject_2 || (templateObject_2 = __makeTemplateObject(["[DEBUG]"], ["[DEBUG]"]))),
    info: {
        label: chalk.cyan(templateObject_3 || (templateObject_3 = __makeTemplateObject(["[INFO]"], ["[INFO]"]))),
        newLine: chalk.cyan(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\u2BA1"], ["\u2BA1"]))),
        newLineEnd: chalk.cyan(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\u2BA1"], ["\u2BA1"])))
    },
    warn: {
        label: chalk.yellowBright(templateObject_6 || (templateObject_6 = __makeTemplateObject(["[WARN]"], ["[WARN]"]))),
        newLine: chalk.yellowBright(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\u2BA1"], ["\u2BA1"]))),
        newLineEnd: chalk.yellowBright(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\u2BA1"], ["\u2BA1"])))
    },
    error: {
        label: chalk.redBright(templateObject_9 || (templateObject_9 = __makeTemplateObject(["[ERROR]"], ["[ERROR]"]))),
        newLine: chalk.redBright(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\u2BA1"], ["\u2BA1"]))),
        newLineEnd: chalk.redBright(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\u2BA1"], ["\u2BA1"])))
    },
    tip: {
        label: chalk.blueBright(templateObject_12 || (templateObject_12 = __makeTemplateObject(["[TIP]"], ["[TIP]"]))),
        newLine: chalk.blueBright(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\u2BA1"], ["\u2BA1"]))),
        newLineEnd: chalk.blueBright(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\u2BA1"], ["\u2BA1"])))
    }
}, { padding: "PREPEND" }, console.log);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
//# sourceMappingURL=logger.js.map