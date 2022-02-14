const express = require("express");
const app = express();

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error");

// env
require("dotenv").config();

// server 上面可能有很多route, 像是 / 通常是主畫面，因此 /api/v1 作為後端

// middleware
app.use(express.static("./public")); // 回傳static file
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

// 404 routes
app.use(notFound);

// error handling middleware
// 在function 接收err 為第一個param, 就會成為errorHandling function
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000; // 有 env 設定就用env, 沒有就用8000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on ${port}`));
  } catch (error) {
    console.log("DB connection fail... ", error);
  }
};

startServer();
