// filepath: /C:/Users/COMPUFIRE/Desktop/COPEREX/laboratorio-3-Taller/configs/server.js
"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import createAdmin from "../src/auth/auth.controller.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";
import authRoutes from "../src/auth/auth.routes.js";
import companyRoutes from "../src/company/company.routes.js";

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
    app.use("/coperex/v1/company", companyRoutes);
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
    const app = express();
    try {
        createAdmin();
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(process.env.PORT);
        console.log(`Server running on port: ${process.env.PORT}`);
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};