"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import createAdmin from "../src/auth/auth.controller.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";
import authRoutes from "../src/auth/auth.routes.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const routes = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use("/coperex/v1/auth", authRoutes);
};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express()
    try{
        createAdmin()
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)    
        console.log(`Server runnig on port: ${process.env.PORT}`)
    }catch(err){
        cosole.log(`Server init failed: ${err}`)
    }
}