import express from "express"
import likeRouter from "./likeRouter.js";
import rateRouter from "./rateRouter.js";
import orderRouter from "./orderRouter.js";

const rootRouter = express()

rootRouter.use("/likes", likeRouter );
rootRouter.use("/rates", rateRouter );
rootRouter.use("/orders" , orderRouter);

export default rootRouter;