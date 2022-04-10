import { Express } from "express";
import mysql from "../database/mysql";

export class ItemInstanceRoutes {
  static async register(app: Express) {
    app.get("/item_instance/type/quantity/:typeID", async (req, res) => {
      let id = req.params["typeID"];
      const query =
        "SELECT count( * ) as total_items FROM item_instance WHERE typeID = " +
        id;
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            item_instance: results,
          });
        }
      });
    });
    app.post("/item_instance/addItem", async (req, res) => {
      const query =
        'INSERT INTO item_instance (itemID, typeID, conditionID) VALUES ("' +
        req.body.itemID +
        '", "' +
        req.body.typeID +
        '", "' +
        req.body.conditionID +
        '")';
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            item_instance: results,
          });
        }
      });
    });

    app.patch("/item_instance/updateCondition", async (req, res) => {
      const query =
        'UPDATE item_instance SET conditionID = "' +
        req.body.conditionID +
        '" WHERE itemID = ' +
        req.body.itemID;
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            item_instance: results,
          });
        }
      });
    });
  }
}
