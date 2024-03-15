import express from "express";
import { getRatesByResId, getRatesByUserId, rateRes } from "../controllers/rateController.js";

const rateRouter = express();

rateRouter.post("", rateRes);
rateRouter.get("/by-res/:res_id", getRatesByResId);
rateRouter.get("/by-user/:user_id", getRatesByUserId);

export default rateRouter;