import express from "express";
import { likeRes, unlikeRes, getLikesByResId, getLikesByUserId } from "../controllers/likeController.js";

const likeRouter = express();

likeRouter.post("/create", likeRes);
likeRouter.delete("/delete", unlikeRes);
likeRouter.get("/get-likes-by-res/:res_id", getLikesByResId);
likeRouter.get("/get-likes-by-user/:user_id", getLikesByUserId);

export default likeRouter;