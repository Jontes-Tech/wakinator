import express, { Application, Request, Response } from "express";
const app: Application = express();
import bcrypt from "bcrypt";
import crypto from "crypto";
import fs, { readFileSync } from "fs";
import conf from "./wakinator.json" assert { type: "json" };
import cors from "cors";
import rateLimit from "express-rate-limit";
//@ts-ignore
import wol from "wol"

console.log("Welcome to Wakinator by Jonte");
if (!conf.keys[0]) {
  console.log(
    "This appears to be a first run! Generating your first API key and secure salt."
  );
  const func = async () => {
    const saltRounds = 512;
    const token = crypto.randomBytes(64).toString("base64");
    const hashedToken = await bcrypt.hash(token, saltRounds);
    let writeconf = {
      version: conf.version,
      keys: [hashedToken],
      hosts: conf.hosts,
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
      "If you would like to add more keys (if you for example would like to add more users, run --adduser."
    );
    console.log(
      "Configuration wizard is done. Please restart the application to get it running!"
    );
  };
  func();
}

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP",
});

app.use(limiter);

app.post("/api/wake", express.json(), (request: any, reply) => {
  for (let i = 0; i < conf.keys.length; i++) {
    if (bcrypt.compareSync(request.body.passwd, conf.keys[i])) {
      //@ts-ignore
      wol.wake(conf.hosts[request.body.target].macadress,  {
        //@ts-ignore
        address: conf.hosts[request.body.target].ipadress || "255.255.255.255",
        //@ts-ignore
        port: conf.hosts[request.body.target].port || 9,
      },(err: any) => {
        if (err) {
          reply.send("Jonte says no");
        }
        else {
          reply.send("Beamed")
        }
      });
    } else {
      reply.send("Jonte says no");
    }
  }
});

app.get("/api/list/boxes", (request: any, reply) => {
  for (let i = 0; i < conf.keys.length; i++) {
    if (
      bcrypt.compareSync(decodeURIComponent(request.query.passwd), conf.keys[i])
    ) {
      reply.send(JSON.stringify(conf.hosts));
    } else {
      reply.status(401);
      reply.send(
        JSON.stringify({
          error: "Jonte says no",
          code: 401,
        })
      );
    }
  }
});

app.listen(conf.port, function () {
  console.log(`App is listening on port ${conf.port} !`);
});
