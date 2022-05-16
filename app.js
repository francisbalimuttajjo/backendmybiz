const express = require("express");
const userRouter = require("./routes/user")
const productCategoryRouter = require("./routes/productCategory")

const { sendResponse } = require("./utils/fns");

const app = express();
app.use(express.json());

// app.use("/api/v1", itemRouter);
app.use("/api/v1", userRouter)
app.use("/api/v1", productCategoryRouter)


//not found route

app.use("*", (req, res) =>
  sendResponse(
    req,
    res,
    404,
    `${req.originalUrl} is not available on the server`,
    "fail"
  )
);


module.exports = app;
