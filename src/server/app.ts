import "../loadEnviroments.js";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { pingController } from "./controllers/ping/pingController.js";
import path from "./path.js";

const allowedOrigins = process.env.ALLOWED_ORIGIN;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(express.json());

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(path.pingController, pingController);

export default app;
