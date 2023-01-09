var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import express from "express";
var app = express();
import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";
import conf from "./wakinator.json" assert { type: "json" };
import cors from "cors";
import rateLimit from "express-rate-limit";
//@ts-ignore
import wol from "wol";
console.log("Welcome to Wakinator by Jonte");
if (!conf.keys[0]) {
    console.log("This appears to be a first run! Generating your first API key and secure salt.");
    var func = function () { return __awaiter(void 0, void 0, void 0, function () {
        var saltRounds, token, hashedToken, writeconf, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    saltRounds = 512;
                    token = crypto.randomBytes(64).toString("base64");
                    return [4 /*yield*/, bcrypt.hash(token, saltRounds)];
                case 1:
                    hashedToken = _a.sent();
                    writeconf = {
                        version: conf.version,
                        keys: [hashedToken],
                        hosts: conf.hosts
                    };
                    data = JSON.stringify(writeconf, null, " ");
                    // write file to disk
                    fs.writeFile("./wakinator.json", data, "utf8", function (err) {
                        if (err) {
                            console.log("Error writing file: ".concat(err));
                        }
                        else {
                            console.log("Written configuration successfully.");
                        }
                    });
                    console.log("Your login token is: " +
                        token +
                        ". Please ẃrite it down. IT WILL NEVER BE SHOWN AGAIN.");
                    console.log("If you would like to add more keys (if you for example would like to add more users, run --adduser.");
                    console.log("Configuration wizard is done. Please restart the application to get it running!");
                    return [2 /*return*/];
            }
        });
    }); };
    func();
}
app.use(cors({
    origin: ["http://localhost:5173"]
}));
var limiter = rateLimit({
    max: 30,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP"
});
app.use(limiter);
app.post("/api/wake", express.json(), function (request, reply) {
    for (var i = 0; i < conf.keys.length; i++) {
        if (bcrypt.compareSync(request.body.passwd, conf.keys[i])) {
            //@ts-ignore
            wol.wake(conf.hosts[request.body.target].macadress, function (err) {
                if (err) {
                    reply.send("Jonte says no");
                }
                else {
                    reply.send("Beamed");
                }
            });
        }
        else {
            reply.send("Jonte says no");
        }
    }
});
app.get("/api/list/boxes", function (request, reply) {
    for (var i = 0; i < conf.keys.length; i++) {
        if (bcrypt.compareSync(decodeURIComponent(request.query.passwd), conf.keys[i])) {
            reply.send(JSON.stringify(conf.hosts));
        }
        else {
            reply.status(401);
            reply.send(JSON.stringify({
                error: "Jonte says no",
                code: 401
            }));
        }
    }
});
app.listen(conf.port, function () {
    console.log("App is listening on port ".concat(conf.port, " !"));
});
//# sourceMappingURL=index.js.map