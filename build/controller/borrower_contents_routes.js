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
exports.BorrowerContentsRoutes = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class BorrowerContentsRoutes {
    static register(app) {
        return __awaiter(this, void 0, void 0, function* () {
            app.get("/borrower_contents/reservation/checkin/:reservationID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["reservationID"];
                const query = "SELECT checkin FROM borrower_contents WHERE reservationID = " + id;
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
                            borrower_contents: results,
                        });
                    }
                });
            }));
            app.post("/borrower_contents/addItem", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'INSERT INTO borrower_contents (reservationID, itemID) VALUES ("' +
                    req.body.reservationID +
                    '", "' +
                    req.body.itemID +
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
                            borrower_contents: results,
                        });
                    }
                });
            }));
            app.patch("/borrower_contents/checkin", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'UPDATE borrower_contents SET checkin = "' +
                    req.body.checkin +
                    '", conditionID = "' +
                    req.body.conditionID +
                    '" WHERE reservationID = ' +
                    req.body.reservationID +
                    " AND itemID = " +
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
                            borrower_contents: results,
                        });
                    }
                });
            }));
            app.get("/borrower_contents/reservation/all/:reservationID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["reservationID"];
                const query = "SELECT * FROM borrower_contents WHERE reservationID = " + id;
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
                            borrower_contents: results,
                        });
                    }
                });
            }));
            app.get("/borrower_contents/item/reservation/:itemID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["itemID"];
                const query = "SELECT reservationID FROM borrower_contents WHERE checkin IS NULL AND itemID = " +
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
                            borrower_contents: results,
                        });
                    }
                });
            }));
            app.get("/borrower_contents/type/quantityCheckedout/:typeID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["typeID"];
                const query = "SELECT COUNT(*) AS amount FROM borrower_contents b INNER JOIN item_instance i ON b.itemID = i.itemID WHERE checkin IS NULL AND i.typeID = " +
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
                            borrower_contents: results,
                        });
                    }
                });
            }));
        });
    }
}
exports.BorrowerContentsRoutes = BorrowerContentsRoutes;
