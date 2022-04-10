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
exports.ClassSupplyRoutes = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class ClassSupplyRoutes {
    static register(app) {
        return __awaiter(this, void 0, void 0, function* () {
            //routes go here, for example app.get("/api/v1/Model/:id", etc....
            app.get("/class_supply/course/all/:courseID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let course = req.params["courseID"];
                const query = "SELECT * FROM class_supply WHERE courseID = " + course;
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
                            class_supply: results,
                        });
                    }
                });
            }));
            app.get("/class_supply/type/all/:typeID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let type = req.params["typeID"];
                const query = "SELECT * FROM class_supply JOIN item_type USING(typeID) WHERE typeID = " +
                    type;
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
                            class_supply: results,
                        });
                    }
                });
            }));
        });
    }
}
exports.ClassSupplyRoutes = ClassSupplyRoutes;
