import express from "express"
import likeRouter from "./likeRouter.js";
import rateRouter from "./rateRouter.js";
import orderRouter from "./orderRouter.js";

const rootRouter = express()

rootRouter.use("/like", likeRouter );
rootRouter.use("/rate", rateRouter );
rootRouter.use("/order" , orderRouter);

export default rootRouter;