import express from "express";

import { showHomepage, addNewFictionalCreature, getAllFictionalCreature, retrieveId, getAFictionalCreature, updateFictionalCreature, deleteFictionalCreature } from "../controller/fictional.js";

const routerFictional = express.Router();

routerFictional.param("fictionalCreatureId", retrieveId)

routerFictional.get('/', showHomepage);

routerFictional.post('/new', addNewFictionalCreature);

routerFictional.get('/view', getAllFictionalCreature);

routerFictional.get('/view/:fictionalCreatureId', getAFictionalCreature);

routerFictional.put('/update/:fictionalCreatureId', updateFictionalCreature);

routerFictional.delete('/remove/:fictionalCreatureId', deleteFictionalCreature);


export default routerFictional;