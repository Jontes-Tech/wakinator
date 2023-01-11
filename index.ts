import express, { Application, Request, Response } from "express";
const app: Application = express();
import bcrypt from "bcrypt";
import crypto from "crypto";
import fs, { readFileSync } from "fs";
import conf from "./wakinator.json" assert { type: "json" };
import cors from "cors";
import rateLimit from "express-rate-limit";
//@ts-ignore
import wol from "wol";

console.log("Welcome to Wakinator by Jonte");
// check for the --add-key parameter
if (process.argv[2] === "--add-key") {
  // Temporarily tell the user that multi-key is not supported
  console.log("Multi-key is not supported yet. Please try again with a later version.");
}
// if conf.keys is empty or the --add-user parameter is present
if (!conf.keys[0]) {
  console.log("Generating your first API key and secure salt.");
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
        console.log(`Error writing file: ${err}`);
      } else {
        console.log(`Written configuration successfully.`);
      }
    });
    console.log(
      "Your login token is: " +
        token +
        ". Please ẃrite it down. IT WILL NEVER BE SHOWN AGAIN."
    );
    console.log(
      "If you would like to add more keys (if you for example would like to add more users, run --add-key."
    );
    console.log(
      "Configuration wizard is done. Please restart the application to get it running!"
    );
  };
  func();
}

app.use(
  cors({
    origin: ["https://wakinator.jontes.page"],
  })
);

const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP",
});

app.use(limiter);

app.post("/api/wake", express.json(), (request: any, reply) => {
  // Loop over all keys in the conf.keys array and check if the password (request.body.passwd) is correct with bcrypt
  for (let i = 0; i < conf.keys.length; i++) {
    if (
      bcrypt.compareSync(decodeURIComponent(request.body.passwd), conf.keys[i])
    ) {
      wol.wake(
        //@ts-ignore
        conf.hosts[request.body.target].macadress,
        {
          address:
          //@ts-ignore
            conf.hosts[request.body.target].ipadress || "255.255.255.255",
          //@ts-ignore
          port: conf.hosts[request.body.target].port || 9,
        },
        (err: any) => {
          if (err) {
            reply.send("Could not beam, that's a shame");
          } else {
            reply.send("Beamed™ successfully!");
          }
        }
      );
    }
  }
});
app.get("/api/list/boxes", (request: any, reply) => {
    if (
      bcrypt.compareSync(decodeURIComponent(request.query.passwd), conf.keys[0])
    ) {
      reply.send(JSON.stringify(conf.hosts));
    } else {
      reply.status(401);
      reply.send(
        "You are not authorized to do this. Please check your API key and try again.");
    }
});

app.listen(conf.port, function () {
  console.log(`App is listening on port ${conf.port} !`);
});
