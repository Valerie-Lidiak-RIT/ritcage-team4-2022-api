"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class UserRoutes {
    static register(app) {
        return __awaiter(this, void 0, void 0, function* () {
            app.get("/users", (req, res) => __awaiter(this, void 0, void 0, function* () {
                // ideally get rid of this?
                const query = "SELECT * FROM user";
                mysql_1.default.query(query, (err, results) => {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            err,
                        });
                    }
                    else {
                        res.json({
                            ok: true,
                            item_typE: results,
                        });
                    }
                });
            }));
            app.get("/user/username/safe/:username", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["username"];
                const query = 'SELECT universityID,firstName,lastName,email,username,roleID FROM user WHERE username = "' +
                    id +
                    '"';
                mysql_1.default.query(query, (err, results) => {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            err,
                        });
                    }
                    else {
                        res.json({
                            ok: true,
                            item_typE: results,
                        });
                    }
                });
            }));
            app.post("/user/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
                // ideally get rid of this?
                const query = 'SELECT COUNT( * ) FROM user WHERE username = "' +
                    req.body.username +
                    '" AND password = "' +
                    req.body.password +
                    '"';
                mysql_1.default.query(query, (err, results) => {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            err,
                        });
                    }
                    else {
                        res.json({
                            ok: true,
                            item_typE: results,
                        });
                    }
                });
            }));
        });
    }
}
exports.UserRoutes = UserRoutes;
