import express from "express";
import { apiPostLogin, postLogin } from "../api/restController/apiUserController";
import { publicOnlyMiddleware } from "../middleware";

const apiRouter = express.Router();

apiRouter.route("/test").all(publicOnlyMiddleware).get()

apiRouter.post("/postLogin", apiPostLogin);
export default apiRouter;