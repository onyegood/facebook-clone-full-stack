const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {
  try {
    let temp = req.header('Authorization');

    const token = temp ? temp.slice(7, temp.length) : '';
    if (!token) {
      return res.status(400).json({ message: 'Invalid authorization' });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid authorization' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
