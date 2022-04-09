import {Express} from "express";
import mysql from '../database/mysql';

export class KitTypeRoutes {
	static async register(app: Express) {

		//routes go here, for example app.get("/api/v1/Model/:id", etc...
		app.get("/kit_types", async (req, res) => {
			const query = 'SELECT * FROM kit_type';
			mysql.query(query, (err:Error, results:object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else { 
					res.json({
						ok: true,
						kit_type: results
					});
				}
			});
		})
		app.get("/kit_type/kit/all/:kitID", async (req, res) => {
			let id = req.params["kitID"];
			const query = 'SELECT * FROM kit_type WHERE kitID = ' + id;
			mysql.query(query, (err:Error, results:object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else {
					res.json({
						ok: true,
						kit_type: results
					});
				}
			});
		})
		app.post("/kit_type/addKit", async (req, res) => {
			const query = 'INSERT INTO kit_type (name, qty, courseID) VALUES ("' + req.body.name + '", "' + req.body.qty + '", "' + req.body.courseID + '")'
			mysql.query(query, (err:Error, results:object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else {
					res.json({
						ok: true,
						kit_type: results
					});
				}
			});
		})
		app.delete("/kit_type/deleteKit/:kitID", async (req, res) => {
			let kid = req.params["kitID"];
	                const query = 'DELETE FROM kit_type WHERE kitID = ' + kid;
	 	        mysql.query(query, (err:Error, results:object[])=>{
        	                if(err){
                	                res.status(400).json({
                        	                ok: false,
                                	        err,
                                	});
                        	}
                        	else {
                                	res.json({
                                        	ok: true,
                                        	kit_type: results
                                	});
                        	}
                	});
        	})


	}

}
