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
exports.ItemInstanceRoutes = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class ItemInstanceRoutes {
    static register(app) {
        return __awaiter(this, void 0, void 0, function* () {
            app.get("/item_instance/type/quantity/:typeID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["typeID"];
                const query = "SELECT count( * ) as total_items FROM item_instance WHERE typeID = " +
                    id;
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
                            item_instance: results,
                        });
                    }
                });
            }));
            app.post("/item_instance/addItem", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'INSERT INTO item_instance (itemID, typeID, conditionID) VALUES ("' +
                    req.body.itemID +
                    '", "' +
                    req.body.typeID +
                    '", "' +
                    req.body.conditionID +
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
                            item_instance: results,
                        });
                    }
                });
            }));
            app.patch("/item_instance/updateCondition", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'UPDATE item_instance SET conditionID = "' +
                    req.body.conditionID +
                    '" WHERE itemID = ' +
                    req.body.itemID;
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
                            item_instance: results,
                        });
                    }
                });
            }));
        });
    }
}
exports.ItemInstanceRoutes = ItemInstanceRoutes;
