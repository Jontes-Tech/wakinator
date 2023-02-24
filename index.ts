import fs from "fs";
import server from "./server.js";
import { log } from "./logger.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

log.info(
  "👋 Welcome to Wakinator by Jonte",
  "You are running version " +
    JSON.parse(fs.readFileSync("./package.json", "utf8")).version
);

let conf = JSON.parse(fs.readFileSync("./wakinator.json", "utf8"));

// if conf.keys is empty or the --add-user parameter is present
if (!conf.keys[0] || process.argv[2] === "--add-key") {
  log.info("🔑 Generating your first API key and secure salt.");
  const func = async () => {
    const saltRounds = 512;
    const token = crypto.randomBytes(64).toString("base64");
    const hashedToken = await bcrypt.hash(token, saltRounds);
    let writeconf = {
      version: conf.version,
      keys: [...conf.keys, hashedToken],
      hosts: conf.hosts,
      port: conf.port,
    };

    const data = JSON.stringify(writeconf, null, " ");

    // write file to disk
    fs.writeFile("./wakinator.json", data, "utf8", (err: any) => {
      if (err) {
        log.error(`Error writing file: ${err}`);
      } else {
        log.ok(`Written configuration successfully.`);
        server();
      }
    });
    log.info(
      "🔑 Your access token is: " +
        token +
        ". Please write it down. THIS WILL NEVER BE SHOWN AGAIN."
    );
    log.tip(
      "If you would like to add more keys (if you for example would like to add more users, run --add-key."
    );
    log.docs("Deleting keys: https://nt3.me/wdkd")
    log.ok("Configuration wizard is done.");
  };
  func();
} else {
  server();
}
