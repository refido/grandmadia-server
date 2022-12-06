const signupRouter = require("./signup");
const loginRouter = require("./login");
const bookRoutes = require("./books");
const storebooksRoutes = require("./storeBooks");

module.exports = [signupRouter, loginRouter, bookRoutes, storebooksRoutes];
