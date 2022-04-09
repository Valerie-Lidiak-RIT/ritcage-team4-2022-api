import {Express} from "express";
import mysql from '../database/mysql';

export class EnrolledCourseRoutes {
	static async register(app: Express) {

		//routes go here, for example app.get("/api/v1/Model/:id", etc....
		app.get("/enrolled_course/universityID/course/:universityID", async (req, res) => {
                        let uid = req.params["universityID"];
                        const query = 'SELECT courseID FROM enrolled_course WHERE universityID = ' + uid;
                        mysql.query(query, (err:Error, results:object[])=>{
                                if(err){
                                        res.status(400).json({
                                                ok:false,
                                                err,
                                        });
                                }
                                else {
                                        res.json({
                                                ok:true,
                                                enrolled_course: results
                                        });
                                }
                        });
                })

	}
}
