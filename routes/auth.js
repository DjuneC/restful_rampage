import express from "express";

const routerFictionalAuth = express.Router();

import { addNewUser } from "../controller/auth.js"

routerFictionalAuth.post("/register", addNewUser);

export default routerFictionalAuth;