import {Express} from "express";
import mysql from '../database/mysql';

export class BorrowerItemRoutes {
	static async register(app: Express) {

		//routes go here, for example app.get("/api/v1/Model/:id", etc....
		app.get("/borrower_items", async (req, res) => {
			const query = 'SELECT * FROM borrower_item';
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
						borrower_item: results
					});
				}
			});
		})

		app.get("/borrower_item/reservation/all/:reservationTime", async (req, res) => {
			let reservTime = req.params["reservationTime"];
			const query = 'SELECT * FROM borrower_item WHERE reservationTime = '+ reservTime;
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
						borrower_item: results
					});
				}
			});
		})

		app.get("/borrower_item/checkout/all/:checkoutTime", async (req, res) => {
			let checkout = req.params["checkoutTime"];
			const query = 'SELECT * FROM borrower_item WHERE checkout = ' + checkout;
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
						borrower_item: results
					});
				}
			});
		})

		app.patch("/borrower_item/pickup", async (req, res) => {
			const query = 'UPDATE borrower_item SET checkout = "' + req.body.checkout + '" WHERE reservationID = ' + req.body.reservationID;
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
						borrower_item: results
					});
				}
			});
		})

		app.get("/borrower_item/none/checkouts", async (req, res) => {
			const query = 'SELECT reservationID,checkout FROM borrower_item WHERE checkout IS NOT NULL';
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
						borrower_item: results
					});
				}
			});
		})
		
		app.get("/borrower_item/none/quantityReservations", async (req, res) => {
			const query = 'SELECT count( * ) FROM borrower_item WHERE reservationTime IS NOT NULL AND checkout IS NULL';
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
						borrower_item: results
					});
				}
			});
		})

		app.get("/borrower_item/none/quantityCheckouts", async (req, res) => {
			const query = 'SELECT COUNT(DISTINCT borrower_item.reservationID) FROM borrower_item INNER JOIN borrower_contents ON borrower_item.reservationID = borrower_contents.reservationID WHERE borrower_item.checkout IS NOT NULL AND borrower_contents.checkin IS NULL';
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
						borrower_item: results
					});
				}
			});
		})

		app.get("/borrower_item/item/itemCheckedout/:itemID", async (req, res) => {
			let ID = req.params["itemID"];
			const query = 'SELECT COUNT(DISTINCT borrower_item.reservationID) FROM borrower_item INNER JOIN borrower_contents ON borrower_item.reservationID = borrower_contents.reservationID WHERE borrower_item.checkout IS NOT NULL AND borrower_contents.checkin IS NULL AND borrower_contents.itemID = ' + ID;
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
						borrower_item: results
					});
				}
			});
		})
		
		app.post("/borrower_item/reservation", async (req, res) => {
			const query = 'INSERT INTO borrower_item(universityID, reservationTime) VALUES ("' + req.body.universityID + '", "' + req.body.reservationTime + '")'
			mysql.query(query, (err:Error,results:object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else{
					res.json({
						ok: true,
						borrower_item: results
					});
				}
			});
		})
		
		app.post("/borrower_item/checkout", async (req, res) => {
                        const query = 'INSERT INTO borrower_item(universityID, checkout) VALUES ("' + req.body.universityID + '", "' + req.body.checkout + '")'
                        mysql.query(query, (err:Error,results:object[])=>{
                                if(err){
                                        res.status(400).json({
                                                ok: false,
                                                err,
                                        });
                                }
                                else{
                                        res.json({
                                                ok: true,
                                                borrower_item: results
                                        });
                                }
                        });
                })

		app.get("/borrower_item/user/all/:universityID", async (req, res) => {
			let id = req.params["universityID"];
			const query = 'SELECT * FROM borrower_item WHERE universityID = "' + id + '"'
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
						borrower_item: results
					});
				}
			});
		})

		app.get("/borrower_item/type/quantityReserved/:typeID", async (req, res) => {
			let id = req.params["typeID"];
			const query = 'SELECT SUM(r.quantity) AS amount FROM borrower_item b INNER JOIN reservation_contents r ON b.reservationID = r.reservationID WHERE b.reservationTime IS NOT NULL AND b.checkout IS NULL AND r.typeID = ' + id;
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
						borrower_item: results
					});
				}
			});
		})

		app.get("/borrower_item/user/unpickedupReservation/:universityID", async (req, res) => {
                        let uid = req.params["universityID"];
                        const query = 'SELECT * FROM borrower_item bi INNER JOIN reservation_contents rc USING(reservationID) WHERE checkout IS NULL AND universityID =' + uid;
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
                                                borrower_item: results
                                        });
                                }
                        });
                })
		app.get("/borrower_item/user/unreturnedReservation/:universityID", async (req, res) => {
                        let uid = req.params["universityID"];
                        const query = 'SELECT * FROM borrower_item bi INNER JOIN borrower_contents bc USING(reservationID) WHERE bc.checkin IS NULL AND bi.universityID =' + uid; 
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
                                                borrower_item: results
                                        });
                                }
                        });
                })

		app.get("/borrower_item/user/returnedReservation/:universityID", async (req, res) => {
                        let uid = req.params["universityID"];
                        const query = 'SELECT * FROM borrower_item bi INNER JOIN borrower_contents bc USING(reservationID) WHERE bc.checkin IS NOT NULL and bi.universityID =' + uid;
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
                                                borrower_item: results
                                        });
                                }
                        });
                })
		
		app.delete("/borrower_item/cancelReservation/:reservationID", async (req, res) => {
			let id = req.params["reservationID"];
	                const query = 'DELETE FROM borrower_item WHERE reservationID = ' + id;
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
                                        	borrower_item: results
                                	});
                        	}
                	});
        	})
		
		app.get("/borrower_item/none/reservations", async (req, res) => {
                        const query = 'SELECT * FROM borrower_item INNER JOIN reservation_contents USING(reservationID) WHERE reservationTime IS NOT NULL';
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
                                                borrower_item: results
                                        });
                                }
                        });
                })

		app.get("/borrower_item/none/unpickedReservations", async (req, res) => {
                        const query = 'SELECT * FROM borrower_item INNER JOIN reservation_contents USING(reservationID) where reservationTime IS NOT NULL AND checkout IS NULL';
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
                                                borrower_item: results
                                        });
                                }
                        });
                })


	}
}
