const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // pass to next middleware >> 沒有設定就會pass to express default error handler (app.js error handling block)
    }
  };
};

module.exports = asyncWrapper;
