const mongoose = require("mongoose");

const connectDB = (url) => {
  // return a promise
  return mongoose.connect(url, {
    // 用一些新的api防止decrecation warning
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
