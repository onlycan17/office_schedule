import express from "express";
import { apiPostLogin, postLogin } from "../api/restController/apiUserController";

const apiRouter = express.Router();

apiRouter.post("/postLogin", apiPostLogin);
export default apiRouter;