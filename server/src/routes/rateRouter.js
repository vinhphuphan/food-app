import express from "express";
import { getRatesByResId, getRatesByUserId, rateRes } from "../controllers/rateController.js";

const rateRouter = express();

rateRouter.post("/create", rateRes);
rateRouter.get("/get-rates-by-res/:res_id", getRatesByResId);
rateRouter.get("/get-rates-by-user/:user_id", getRatesByUserId);

export default rateRouter;