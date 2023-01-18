import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import rateLimit from "express-rate-limit";
import wol from "wol";
import fs from "fs";
import { log } from "./logger.js";
export default function () {
    var app = express();
    var conf = JSON.parse(fs.readFileSync("./wakinator.json", "utf8"));
    app.use(cors({
        origin: ["http://localhost:5173"]
    }));
    var limiter = rateLimit({
        max: 15,
        windowMs: 60 * 60 * 1000,
        message: "Too many request from this IP"
    });
    app.use(limiter);
    app.post("/api/wake", express.json(), function (request, reply) {
        var match = false;
        // Loop over all keys in the conf.keys array and check if the password (request.body.passwd) is correct with bcrypt
        for (var i = 0; i < conf.keys.length; i++) {
            log.ok("Auth: Succeeded with " + conf.keys[i].substring(4, 12));
            if (bcrypt.compareSync(decodeURIComponent(request.body.passwd), conf.keys[i])) {
                match = true;
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
                break;
            }
            else {
                log.error("Auth: Failed with " + conf.keys[i].substring(4, 12));
            }
        }
        if (!match) {
            reply.status(401).send("Incorrect password");
        }
    });
    app.get("/api/list/boxes", function (request, reply) {
        //  Check the password against the conf.keys array
        var match = false;
        for (var i = 0; i < conf.keys.length; i++) {
            if (bcrypt.compareSync(decodeURIComponent(request.query.passwd), conf.keys[i])) {
                log.ok("Auth: Succeeded with " + conf.keys[i].substring(4, 12));
                reply.send(conf.hosts);
                match = true;
                break;
            }
            else {
                log.error("Auth: Failed with " + conf.keys[i].substring(4, 12));
            }
        }
        if (!match) {
            reply.status(401).send("Incorrect password");
        }
    });
    app.listen(conf.port, function () {
        log.info("App is listening on port ".concat(conf.port, "!"));
    });
}
//# sourceMappingURL=server.js.map