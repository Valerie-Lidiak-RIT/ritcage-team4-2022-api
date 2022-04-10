import { Express } from "express";
import mysql from "../database/mysql";

export class UserRoutes {
  static async register(app: Express) {
    app.get("/users", async (req, res) => {
      // ideally get rid of this?
      const query = "SELECT * FROM user";
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            item_typE: results,
          });
        }
      });
    });

    app.get("/user/username/safe/:username", async (req, res) => {
      let id = req.params["username"];
      const query =
        'SELECT universityID,firstName,lastName,email,username,roleID FROM user WHERE username = "' +
        id +
        '"';
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            item_typE: results,
          });
        }
      });
    });

    app.post("/user/login", async (req, res) => {
      // ideally get rid of this?
      const query =
        'SELECT COUNT( * ) FROM user WHERE username = "' +
        req.body.username +
        '" AND password = "' +
        req.body.password +
        '"';
      mysql.query(query, (err: Error, results: object[]) => {
        if (err) {
          res.status(400).json({
            ok: false,
            err,
          });
        } else {
          res.json({
            ok: true,
            item_typE: results,
          });
        }
      });
    });
  }
}
