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
exports.BorrowerItemRoutes = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class BorrowerItemRoutes {
    static register(app) {
        return __awaiter(this, void 0, void 0, function* () {
            //routes go here, for example app.get("/api/v1/Model/:id", etc....
            app.get("/borrower_items", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT * FROM borrower_item";
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/reservation/all/:reservationTime", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let reservTime = req.params["reservationTime"];
                const query = "SELECT * FROM borrower_item WHERE reservationTime = " + reservTime;
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/checkout/all/:checkoutTime", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let checkout = req.params["checkoutTime"];
                const query = "SELECT * FROM borrower_item WHERE checkout = " + checkout;
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.patch("/borrower_item/pickup", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'UPDATE borrower_item SET checkout = "' +
                    req.body.checkout +
                    '" WHERE reservationID = ' +
                    req.body.reservationID;
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/none/checkouts", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT reservationID,checkout FROM borrower_item WHERE checkout IS NOT NULL";
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/none/quantityReservations", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT count( * ) FROM borrower_item WHERE reservationTime IS NOT NULL AND checkout IS NULL";
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/none/quantityCheckouts", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT COUNT(DISTINCT borrower_item.reservationID) FROM borrower_item INNER JOIN borrower_contents ON borrower_item.reservationID = borrower_contents.reservationID WHERE borrower_item.checkout IS NOT NULL AND borrower_contents.checkin IS NULL";
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/item/itemCheckedout/:itemID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let ID = req.params["itemID"];
                const query = "SELECT COUNT(DISTINCT borrower_item.reservationID) FROM borrower_item INNER JOIN borrower_contents ON borrower_item.reservationID = borrower_contents.reservationID WHERE borrower_item.checkout IS NOT NULL AND borrower_contents.checkin IS NULL AND borrower_contents.itemID = " +
                    ID;
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.post("/borrower_item/reservation", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'INSERT INTO borrower_item(universityID, reservationTime) VALUES ("' +
                    req.body.universityID +
                    '", "' +
                    req.body.reservationTime +
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.post("/borrower_item/checkout", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = 'INSERT INTO borrower_item(universityID, checkout) VALUES ("' +
                    req.body.universityID +
                    '", "' +
                    req.body.checkout +
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/user/all/:universityID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["universityID"];
                const query = 'SELECT * FROM borrower_item WHERE universityID = "' + id + '"';
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/type/quantityReserved/:typeID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["typeID"];
                const query = "SELECT SUM(r.quantity) AS amount FROM borrower_item b INNER JOIN reservation_contents r ON b.reservationID = r.reservationID WHERE b.reservationTime IS NOT NULL AND b.checkout IS NULL AND r.typeID = " +
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/user/unpickedupReservation/:universityID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let uid = req.params["universityID"];
                const query = "SELECT * FROM borrower_item bi INNER JOIN reservation_contents rc USING(reservationID) WHERE checkout IS NULL AND universityID =" +
                    uid;
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/user/unreturnedReservation/:universityID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let uid = req.params["universityID"];
                const query = "SELECT * FROM borrower_item bi INNER JOIN borrower_contents bc USING(reservationID) WHERE bc.checkin IS NULL AND bi.universityID =" +
                    uid;
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/user/returnedReservation/:universityID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let uid = req.params["universityID"];
                const query = "SELECT * FROM borrower_item bi INNER JOIN borrower_contents bc USING(reservationID) WHERE bc.checkin IS NOT NULL and bi.universityID =" +
                    uid;
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.delete("/borrower_item/cancelReservation/:reservationID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let id = req.params["reservationID"];
                const query = "DELETE FROM borrower_item WHERE reservationID = " + id;
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/none/reservations", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT * FROM borrower_item INNER JOIN reservation_contents USING(reservationID) WHERE reservationTime IS NOT NULL";
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
                            borrower_item: results,
                        });
                    }
                });
            }));
            app.get("/borrower_item/none/unpickedReservations", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const query = "SELECT * FROM borrower_item INNER JOIN reservation_contents USING(reservationID) where reservationTime IS NOT NULL AND checkout IS NULL";
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
                            borrower_item: results,
                        });
                    }
                });
            }));
        });
    }
}
exports.BorrowerItemRoutes = BorrowerItemRoutes;
