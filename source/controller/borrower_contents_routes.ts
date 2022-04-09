import {Express} from "express";
import mysql from '../database/mysql';

export class BorrowerContentsRoutes {
	static async register(app: Express) {
		app.get("/borrower_contents/reservation/checkin/:reservationID", async (req, res) => {
			let id = req.params["reservationID"];
			const query = 'SELECT checkin FROM borrower_contents WHERE reservationID = ' + id;
			mysql.query(query, (err:Error, results: object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else {
					res.json({
						ok: true,
						borrower_contents: results
					});
				}
			});
		})
		app.post("/borrower_contents/addItem", async (req, res) => {
			const query = 'INSERT INTO borrower_contents (reservationID, itemID) VALUES ("' + req.body.reservationID + '", "' + req.body.itemID + '")'
			mysql.query(query, (err:Error, results: object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else {
					res.json({
						ok: true,
						borrower_contents: results
					});
				}
			});
		})
		app.patch("/borrower_contents/checkin", async (req, res) => {
			const query = 'UPDATE borrower_contents SET checkin = "' + req.body.checkin + '", conditionID = "'+ req.body.conditionID + '" WHERE reservationID = ' + req.body.reservationID + ' AND itemID = ' + req.body.itemID;
			mysql.query(query, (err:Error, results: object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else {
					res.json({
						ok: true,
						borrower_contents: results
					});
				}
			});
		})
		app.get("/borrower_contents/reservation/all/:reservationID", async (req, res) => {
			let id = req.params["reservationID"];
			const query = 'SELECT * FROM borrower_contents WHERE reservationID = ' + id;
			mysql.query(query, (err:Error, results: object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else {
					res.json({
						ok: true,
						borrower_contents: results
					});
				}
			});
		})

		app.get("/borrower_contents/item/reservation/:itemID", async (req, res) => {
			let id = req.params["itemID"];
			const query = 'SELECT reservationID FROM borrower_contents WHERE checkin IS NULL AND itemID = ' + id;
			mysql.query(query, (err:Error, results: object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else {
					res.json({
						ok: true,
						borrower_contents: results
					});
				}
			});
		})

		app.get("/borrower_contents/type/quantityCheckedout/:typeID", async (req, res) => {
			let id = req.params["typeID"];
			const query = 'SELECT COUNT(*) AS amount FROM borrower_contents b INNER JOIN item_instance i ON b.itemID = i.itemID WHERE checkin IS NULL AND i.typeID = ' + id;
			mysql.query(query, (err:Error, results: object[])=>{
				if(err){
					res.status(400).json({
						ok: false,
						err,
					});
				}
				else {
					res.json({
						ok: true,
						borrower_contents: results
					});
				}
			});
		})



	}
}
