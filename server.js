import express from "express";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import cors from "cors";
import wol from "wol";
import fs from "fs";
import { log } from "./logger.js";
import helmet from "helmet";
export default function () {
    var app = express();
    var conf = JSON.parse(fs.readFileSync("./wakinator.json", "utf8"));
    var corsURL = "https://wakinator.jontes.page";
    var limiter = rateLimit({
        max: 15,
        windowMs: 60 * 60 * 1000,
        message: "Too many request from this IP"
    });
    app.use(limiter);
    app.use(express.urlencoded({ limit: '1mb', extended: true }));
    app.use(helmet());
    app.use(cors({
        origin: corsURL,
        methods: ['GET', 'POST']
    }));
    var authenticate = function (request, response, next) {
        var _a;
        var match = false;
        // Loop over all keys in the conf.keys array and check if the password is correct with bcrypt
        for (var i = 0; i < conf.keys.length; i++) {
            log.ok("REQ: KEY=".concat(conf.keys[i].substring(4, 12), " USERAGENT=").concat(request.get("User-Agent"), " PATH=").concat(request.path));
            if (bcrypt.compareSync(decodeURIComponent((_a = request.headers.authorization) !== null && _a !== void 0 ? _a : ""), conf.keys[i])) {
                match = true;
                break;
            }
            else {
                log.error("Auth: Failed with " + conf.keys[i].substring(4, 12));
            }
        }
        if (!match) {
            response.status(401).send("NOOOO. Incorrect.");
        }
        else {
            next();
        }
    };
    app.use(authenticate);
    if (corsURL !== "https://wakinator.jontes.page")
        log.warn("You are using custom CORS! If this is not intentional, you're experiencing a software bug.");
    app.post("/api/wake", express.json({ limit: '1mb' }), function (request, reply) {
        if (!conf.dryrun) {
            wol.wake(
            //@ts-ignore
            conf.hosts[request.body.target].macadress, {
                address: 
                //@ts-ignore
                conf.hosts[request.body.target].ipadress || "255.255.255.255",
                //@ts-ignore
                port: conf.hosts[request.body.target].port || 9
            }, function (err) {
                if (err) {
                    reply.send("Could not beam, that's a shame");
                }
                else {
                    reply.send("Beamed™ successfully!");
                }
            });
        }
    });
    app.get("/api/list/boxes", function (request, reply) {
        reply.send(conf.hosts);
    });
    app.get("/api/identify", function (request, reply) {
        var _a;
        for (var i = 0; i < conf.keys.length; i++) {
            if (bcrypt.compareSync((_a = request.headers.authorization) !== null && _a !== void 0 ? _a : "", conf.keys[i])) {
                log.ok("Key Identified: " + conf.keys[i]);
                reply.send(conf.keys[i]);
                break;
            }
            else {
                log.error("Auth: Failed with " + conf.keys[i].substring(4, 12));
            }
        }
    });
    app.listen(conf.port, function () {
        log.info("Wakinator is listening on port ".concat(conf.port, "!"));
    });
}
//# sourceMappingURL=server.js.map