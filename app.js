const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const salesRouter = require("./routes/sale");
const cashItemRouter = require("./routes/cashItem");
const stockItemRouter = require("./routes/stockItem");
const transactionRouter = require("./routes/transaction");
const productCategoryRouter = require("./routes/productCategory");

const { sendResponse } = require("./utils/fns");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msh: "logged in" });
});

app.use("/api/v1", stockItemRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", salesRouter);
app.use("/api/v1", cashItemRouter);
app.use("/api/v1", transactionRouter);
app.use("/api/v1", productCategoryRouter);

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
