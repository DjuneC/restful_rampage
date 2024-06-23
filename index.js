import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";

import { connect } from "./config/dbConnection.js";

import routerFictionalAuth from "./routes/auth.js";
import routerFictional from "./routes/fictional.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", routerFictionalAuth)
app.use("/creatures", routerFictional);

(async () => {
    try {
      await connect();

      app.listen(PORT, () => {
        console.log(`Server is up and running at http://localhost:${PORT}`);
    });
    } catch (error) {
      console.error("Error initializing application:", error);
      process.exit(1);
    }
  })();


