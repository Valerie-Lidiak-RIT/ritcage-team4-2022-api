import {Express} from "express";
import {isValidInt, isValidString, sendError, sendNotFound} from "../utils/generalUtils";
import {Like} from "typeorm";
import {Model} from "../entities/model";

//create the class for ModelRoutes - everything will end up being async because we are an Async application
export class ModelRoutes {
    static async register(app: Express) {
        //Create the route you want, the :id means we are expecting the frontend to send a value there we will be using
        app.get("/api/v1/Model/:id", async (req, res) => {
            //this is a custom validation field - in my general utilities file, will be packaged as well
            if (!isValidInt(req.params["id"])) {
                sendError(res, "Invalid ID");
                return;
            }
            //this is the Logic, find the model with the id value
            let wantedModel = await Model.findOne(req.params['id']);

            if (wantedModel == null) {
                sendNotFound(res, `Model with id ${req.params['id']} does not exist!`);
                return;
            }

            res.send(wantedModel);
        })

        //this is how you handle getting ALL of a table/entity
        app.get("/api/v1/Models", async (req, res) => {
            let wantedModels = await Model.find();

            res.send(wantedModels);
        })

        //how you handle a search route
        app.get("/api/v1/Models/search/:query", async (req, res) => {
            if (!isValidString(req.params["query"])) {
                sendError(res, "Invalid Query");
                return;
            }

            let query = req.params['query'];

            //in here you can see we are searching the name, description, and keywords to see if it has the query in it anywhere
            //the % is a wildcard, and the ${} allows us to insert our variable we are searching for
            let wantedModels = await Model.find({
                where: [
                    {name: Like(`%${query}%`)},
                    {description: Like(`%${query}%`)},
                    {keywords: Like(`%${query}%`)}
                ]
            });

            res.send(wantedModels);
        });

        //this gets all models of a specific category
        app.get("/api/v1/Models/category/:id", async (req, res) => {
            if (!isValidInt(req.params["id"])) {
                sendError(res, "Invalid ID");
                return;
            }

            let wantedModels = await Model.find({
                where: [
                    {categoryId: req.params['id']},
                ]
            });

            res.send(wantedModels);
        })

        //this gets all models with that specific ID
        app.get("/api/v1/Models/location/:id", async (req, res) => {
            if (!isValidInt(req.params["id"])) {
                sendError(res, "Invalid ID");
                return;
            }

            let wantedModels = await Model.find({
                where: [
                    {locationId: req.params['id']},
                ]
            });

            res.send(wantedModels);
        })

        //this lets us query the type of term
        app.get("/api/v1/Models/term/:query", async (req, res) => {
            if (!isValidString(req.params["query"])) {
                sendError(res, "Invalid Query");
                return;
            }

            let query = req.params['query'];

            let wantedModels = await Model.find({
                where: [
                    {term: Like(`%${query}%`)}
                ]
            });

            res.send(wantedModels);
        });

        //how to make (post) a model to the database - you can't test post/patches or deletes as easily as GETS, you need something like
        //Insomnia or postman or a bunch of code in the f12 console line of your browser to test it
        app.post("/api/v1/Model", async (req, res) => {
            //Works but needs validation on parameters -> I did not actually validate the parameters in back-end, i decided to handle it on the database side (you will see what I mean in the TypeORM Model file)
            let newModel = await Model.create({name: req.body.name, description: req.body.description, term: req.body.term, categoryId: req.body.categoryId, locationId: req.body.locationId, keywords: req.body.keywords, restrictionsModelsId: req.body.restrictionsModelsId}).save();
            res.send(newModel);
        });

        //this is how you update a database item (a patch), as you can see it requires a way to identify which item we are updating first
        app.patch("/api/v1/Model/:id", async (req,res) =>{
            let wantedModel = await Model.findOne(req.params['id']);

            //console.log(wantedModel.restrictionsModelsId);
            if (wantedModel == null) {
                sendNotFound(res, `Model with id ${req.params['id']} does not exist!`);
                return;
            }else{

                wantedModel.name = req.body.name || wantedModel.name;
                wantedModel.description = req.body.description || wantedModel.description;
                wantedModel.term = req.body.term || wantedModel.term;
                wantedModel.categoryId = req.body.categoryId || wantedModel.categoryId;
                wantedModel.locationId = req.body.locationId || wantedModel.locationId;
                wantedModel.keywords = req.body.keywords || wantedModel.keywords;
                wantedModel.restrictionsModelsId = req.body.restrictionsModelsId || wantedModel.restrictionsModelsId;

                 let updatedModel = await Model.save(wantedModel);

                 res.send(updatedModel);

            }

        });

    }

}
