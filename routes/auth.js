import express from "express";

const routerFictionalAuth = express.Router();

import { addNewUser, loginUser } from "../controller/auth.js"

routerFictionalAuth.post("/register", addNewUser);

routerFictionalAuth.post('/sign-in', loginUser);

export default routerFictionalAuth;