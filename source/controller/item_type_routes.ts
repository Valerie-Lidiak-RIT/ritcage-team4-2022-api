import { Express } from "express";
import mysql from "../database/mysql";

export class ItemTypeRoutes {
  static async register(app: Express) {
    //routes go here, for example app.get("/api/v1/Model/:id", etc....
    app.get("/item_types", async (req, res) => {
      const query = "SELECT * FROM item_type";
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            item_type: results,
          });
        }
      });
    });
    app.get("/item_type/type/all/:typeID", async (req, res) => {
      let id = req.params["typeID"];
      const query = "SELECT * FROM item_type WHERE typeid = " + id;
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            item_type: results,
          });
        }
      });
    });

    app.post("/item_type/addItem", async (req, res) => {
      const query =
        'INSERT INTO item_type (name, model, description, cost) VALUES ("' +
        req.body.name +
        '", "' +
        req.body.model +
        '", "' +
        req.body.description +
        '", "' +
        req.body.cost +
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
            item_type: results,
          });
        }
      });
    });
  }
}
