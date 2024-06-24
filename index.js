import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import { connect } from "./config/dbConnection.js";

import routerFictionalAuth from "./routes/auth.js";
import routerFictional from "./routes/fictional.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI_SESSIONS}),
  cookie: {
    secure: process.env.NODE_ENV === "development" ? false : true
  }
}))

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


