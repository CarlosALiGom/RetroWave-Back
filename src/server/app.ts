import "../loadEnviroments.js";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { pingController } from "./controllers/ping/pingController.js";
import paths from "./utils/paths/paths.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import userRouter from "./routers/userRouter/userRouter.js";
import synthRouter from "./routers/synthRouter/synthRouter.js";

const allowedOrigins = process.env.ALLOWED_ORIGIN;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.get(paths.pingController, pingController);

app.use(paths.user, userRouter);

app.use(paths.synths, synthRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
