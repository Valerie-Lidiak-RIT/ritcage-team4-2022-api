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
exports.EnrolledCourseRoutes = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class EnrolledCourseRoutes {
    static register(app) {
        return __awaiter(this, void 0, void 0, function* () {
            //routes go here, for example app.get("/api/v1/Model/:id", etc....
            app.get("/enrolled_course/universityID/course/:universityID", (req, res) => __awaiter(this, void 0, void 0, function* () {
                let uid = req.params["universityID"];
                const query = "SELECT courseID FROM enrolled_course WHERE universityID = " + uid;
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
                            enrolled_course: results,
                        });
                    }
                });
            }));
        });
    }
}
exports.EnrolledCourseRoutes = EnrolledCourseRoutes;
