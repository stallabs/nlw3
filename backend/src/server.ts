import express from "express";
import path from "path";
import "express-async-errors";
import cors from "cors";

import "./database/connection";
import routes from "./routes";
import errorHandler from "./errors/handler";
import requestMiddleware from "./middlewares/requestMiddleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestMiddleware.checkSyntaxError);
// app.use(requestMiddleware.isBody);
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.listen(3333); //localhost:3333
