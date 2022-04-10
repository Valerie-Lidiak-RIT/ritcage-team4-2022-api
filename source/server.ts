//import needed files
import express, { Express } from "express";
import morgan from "morgan";
var cors = require("cors");
import * as borrower_item_controller from "./controller/borrower_item_routes";
import * as class_supply_controller from "./controller/class_supply_routes";
import * as course_controller from "./controller/course_routes";
import * as enrolled_course_controller from "./controller/enrolled_course_routes";
import * as itemKitContent_controller from "./controller/itemKitContent_routes";
import * as item_condition_controller from "./controller/item_condition_routes";
import * as item_instance_controller from "./controller/item_instance_routes";
import * as item_type_controller from "./controller/item_type_routes";
import * as kit_type_controller from "./controller/kit_type_routes";
import * as role_controller from "./controller/role_routes";
import * as user_controller from "./controller/user_routes";
import * as borrower_contents_controller from "./controller/borrower_contents_routes";
import * as reservation_contents_controller from "./controller/reservation_contents_routes";

//specifies how the project should run
const app: Express = express();
const port = 3000;

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

//routes files
borrower_item_controller.BorrowerItemRoutes.register(app);
class_supply_controller.ClassSupplyRoutes.register(app);
course_controller.CourseRoutes.register(app);
enrolled_course_controller.EnrolledCourseRoutes.register(app);
itemKitContent_controller.ItemKitContentRoutes.register(app);
item_condition_controller.ItemConditionRoutes.register(app);
item_instance_controller.ItemInstanceRoutes.register(app);
item_type_controller.ItemTypeRoutes.register(app);
kit_type_controller.KitTypeRoutes.register(app);
role_controller.RoleRoutes.register(app);
user_controller.UserRoutes.register(app);
borrower_contents_controller.BorrowerContentsRoutes.register(app);
reservation_contents_controller.ReservationContentsRoutes.register(app);

//handles the variables that represent incoming and outgoing messages
app.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

//starts the server
app.listen(port, () => {
  console.log("The server is running on port " + port);
});
