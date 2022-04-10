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
exports.KitTypeRoutes = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class KitTypeRoutes {
    static register(app) {
        return __awaiter(this, void 0, void 0, function* () {
            //routes go here, for example app.get("/api/v1/Model/:id", etc...
            app.get("/kit_types", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT * FROM kit_type";
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
                            kit_type: results,
                        });
                    }
                });
            }));
            app.get("/kit_type/kit/all/:kitID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["kitID"];
                const query = "SELECT * FROM kit_type WHERE kitID = " + id;
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
                            kit_type: results,
                        });
                    }
                });
            }));
            app.post("/kit_type/addKit", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'INSERT INTO kit_type (name, qty, courseID) VALUES ("' +
                    req.body.name +
                    '", "' +
                    req.body.qty +
                    '", "' +
                    req.body.courseID +
                    '")';
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
                            kit_type: results,
                        });
                    }
                });
            }));
            app.delete("/kit_type/deleteKit/:kitID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let kid = req.params["kitID"];
                const query = "DELETE FROM kit_type WHERE kitID = " + kid;
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
                            kit_type: results,
                        });
                    }
                });
            }));
        });
    }
}
exports.KitTypeRoutes = KitTypeRoutes;
