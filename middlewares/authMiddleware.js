const jwt = require('jsonwebtoken');
const Users = require('../schemas/users');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const cookies = req.cookies[process.env.COOKIE_NAME];
    if (!cookies) {
      return res.status(403).send({
        errorMessage: 'Login diperlukan.',
      });
    }

    const [tokenType, tokenValue] = cookies.split(' ');
    if (tokenType !== 'Bearer') {
      return res.status(403).send({
        errorMessage: 'Terdapat error pada cookie yang diteruskan.',
      });
    }

    const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
    const user = await Users.findById(userId).exec();

    res.locals.user = user;
    next();
  } catch (error) {
    console.trace(error);
    return res.status(403).send({
      errorMessage: 'Login diperlukan.',
    });
  }
};
