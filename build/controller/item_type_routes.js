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
exports.ItemTypeRoutes = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class ItemTypeRoutes {
    static register(app) {
        return __awaiter(this, void 0, void 0, function* () {
            //routes go here, for example app.get("/api/v1/Model/:id", etc....
            app.get("/item_types", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT * FROM item_type";
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
                            item_type: results,
                        });
                    }
                });
            }));
            app.get("/item_type/type/all/:typeID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["typeID"];
                const query = "SELECT * FROM item_type WHERE typeid = " + id;
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
                            item_type: results,
                        });
                    }
                });
            }));
            app.post("/item_type/addItem", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'INSERT INTO item_type (name, model, description, cost) VALUES ("' +
                    req.body.name +
                    '", "' +
                    req.body.model +
                    '", "' +
                    req.body.description +
                    '", "' +
                    req.body.cost +
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
                            item_type: results,
                        });
                    }
                });
            }));
        });
    }
}
exports.ItemTypeRoutes = ItemTypeRoutes;
