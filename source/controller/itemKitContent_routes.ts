import { Express } from "express";
import mysql from "../database/mysql";

export class ItemKitContentRoutes {
  static async register(app: Express) {
    //routes go here, for example app.get("/api/v1/Model/:id", etc....
    app.get("/itemKitContent/kit/type/:kitID", async (req, res) => {
      let ID = req.params["kitID"];
      const query =
        "SELECT ikc.typeID,ikc.qty,it.name FROM itemKitContent ikc LEFT JOIN item_type it USING(typeID) WHERE ikc.kitID = " +
        ID;
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            itemKitContent: results,
          });
        }
      });
    });

    app.post("/itemKitContent/addItem", async (req, res) => {
      const query =
        'INSERT INTO itemKitContent (typeID, kitID, qty) VALUES ("' +
        req.body.typeID +
        '", "' +
        req.body.kitID +
        '", "' +
        req.body.qty +
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
            itemKitContent: results,
          });
        }
      });
    });
    app.delete("/itemKitContent/removeItem", async (req, res) => {
      const query =
        "DELETE FROM itemKitContent WHERE typeID = " +
        req.body.typeID +
        " AND kitID = " +
        req.body.kitID;
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            itemKitContent: results,
          });
        }
      });
    });
  }
}
