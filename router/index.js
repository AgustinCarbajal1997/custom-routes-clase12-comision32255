const { Router } = require("express");
// const dictionaryRouter = require("./dictionary.router");
const UserRouter = require("./users.router");
const router = Router();

const userRouter = new UserRouter();

router.use("/user", userRouter.getRouter());
// router.use("/dictionary", dictionaryRouter);

module.exports = router;
