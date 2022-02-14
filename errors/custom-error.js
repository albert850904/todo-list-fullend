// override JS Error Objects
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); // invokes a contructor of parent class
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = {
  createCustomError,
  CustomAPIError,
};
