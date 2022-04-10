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
exports.ReservationContentsRoutes = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class ReservationContentsRoutes {
    static register(app) {
        return __awaiter(this, void 0, void 0, function* () {
            //routes go here, for example app.get("/api/v1/Model/:id", etc....
            app.post("/reservation_contents/addType", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'INSERT INTO reservation_contents(reservationID, typeID, quantity) VALUES ("' +
                    req.body.reservationID +
                    '", "' +
                    req.body.typeID +
                    '", "' +
                    req.body.quantity +
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
                            reservation_contents: results,
                        });
                    }
                });
            }));
            app.get("/reservation_contents/reservation/all/:reservationID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["reservationID"];
                const query = "SELECT * FROM reservation_contents WHERE reservationID = " + id;
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
                            reservation_contents: results,
                        });
                    }
                });
            }));
        });
    }
}
exports.ReservationContentsRoutes = ReservationContentsRoutes;
