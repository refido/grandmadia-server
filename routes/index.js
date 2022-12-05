const signupRouter = require("./signup");
const loginRouter = require("./login");
const bookRoutes = require("./books");

module.exports = [signupRouter, loginRouter, bookRoutes];
