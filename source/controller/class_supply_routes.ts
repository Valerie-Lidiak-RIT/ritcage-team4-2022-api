import {Express} from "express";
import mysql from '../database/mysql';

export class ClassSupplyRoutes {
	static async register(app: Express) {

		//routes go here, for example app.get("/api/v1/Model/:id", etc....
		app.get("/class_supply/course/all/:courseID", async (req, res) => {
			let course = req.params["courseID"];
			const query = 'SELECT * FROM class_supply WHERE courseID = ' + course; 
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
						class_supply: results
					});
				}
			});
		})

		app.get("/class_supply/type/all/:typeID", async (req, res) => {
                        let type = req.params["typeID"];
                        const query = 'SELECT * FROM class_supply JOIN item_type USING(typeID) WHERE typeID = ' + type;
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
                                                class_supply: results
                                        });
                                }
                        });
                })

	}
}
