import express from "express";

const routerFictionalAuth = express.Router();

import { addNewUser, loginUser, testSome } from "../controller/auth.js"
import { authenticationToken } from "../middlewares/authenticationToken.js";

routerFictionalAuth.post("/register", addNewUser);

routerFictionalAuth.post('/sign-in', loginUser);

routerFictionalAuth.get('/private', authenticationToken, testSome)

export default routerFictionalAuth;