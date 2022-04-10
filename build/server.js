"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import needed files
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
var cors = require("cors");
const borrower_item_controller = __importStar(require("./controller/borrower_item_routes"));
const class_supply_controller = __importStar(require("./controller/class_supply_routes"));
const course_controller = __importStar(require("./controller/course_routes"));
const enrolled_course_controller = __importStar(require("./controller/enrolled_course_routes"));
const itemKitContent_controller = __importStar(require("./controller/itemKitContent_routes"));
const item_condition_controller = __importStar(require("./controller/item_condition_routes"));
const item_instance_controller = __importStar(require("./controller/item_instance_routes"));
const item_type_controller = __importStar(require("./controller/item_type_routes"));
const kit_type_controller = __importStar(require("./controller/kit_type_routes"));
const role_controller = __importStar(require("./controller/role_routes"));
const user_controller = __importStar(require("./controller/user_routes"));
const borrower_contents_controller = __importStar(require("./controller/borrower_contents_routes"));
const reservation_contents_controller = __importStar(require("./controller/reservation_contents_routes"));
//specifies how the project should run
const app = (0, express_1.default)();
const port = 3000;
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
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
