import mysql = require("mysql");
//creates a class that can be called
export default class MySQL {
  private static _instance: MySQL;
  //specifies the connection type to connect to the server
  connection: mysql.Connection;
  connected: boolean = false;
  //specifies where to connect to go to the server, then connects to it
  constructor() {
    this.connection = mysql.createConnection({
      host: "192.168.204.218",
      user: "backend",
      password: "Student1!",
      database: "ritCageDB",
    });

    this.connect();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
  //specifies a function that allows you to pass custom queries onto the database
  public static query(query: string, callback: Function) {
    this.instance.connection.query(
      query,
      (err: Error, results: Object[], fields: []) => {
        if (err) {
          callback(err);
        } else if (results.length === 0) {
          callback("There is no record");
        } else {
          callback(null, results);
        }
      }
    );
  }

  public static escape(id: any) {
    return this.instance.connection.escape(id);
  }
  //this does the connection to the database. It also handles errors
  private connect() {
    this.connection.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }
      this.connected = true;
      console.log("MySQL Connection stablished!");
    });
  }
}
