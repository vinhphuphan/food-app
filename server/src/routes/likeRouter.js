import express from "express";
import { likeRes, unlikeRes, getLikesByResId, getLikesByUserId } from "../controllers/likeController.js";

const likeRouter = express();

likeRouter.post("", likeRes);
likeRouter.delete("", unlikeRes);
likeRouter.get("/by-res/:res_id", getLikesByResId);
likeRouter.get("/by-user/:user_id", getLikesByUserId);

export default likeRouter;