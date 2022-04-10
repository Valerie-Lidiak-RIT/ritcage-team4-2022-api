import { Express } from "express";
import mysql from "../database/mysql";

export class ReservationContentsRoutes {
  static async register(app: Express) {
    //routes go here, for example app.get("/api/v1/Model/:id", etc....
    app.post("/reservation_contents/addType", async (req, res) => {
      const query =
        'INSERT INTO reservation_contents(reservationID, typeID, quantity) VALUES ("' +
        req.body.reservationID +
        '", "' +
        req.body.typeID +
        '", "' +
        req.body.quantity +
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
            reservation_contents: results,
          });
        }
      });
    });

    app.get(
      "/reservation_contents/reservation/all/:reservationID",
      async (req, res) => {
        let id = req.params["reservationID"];
        const query =
          "SELECT * FROM reservation_contents WHERE reservationID = " + id;
        mysql.query(query, (err: Error, results: object[]) => {
          if (err) {
            res.status(400).json({
              ok: false,
              err,
            });
          } else {
            res.json({
              ok: true,
              reservation_contents: results,
            });
          }
        });
      }
    );
  }
}
