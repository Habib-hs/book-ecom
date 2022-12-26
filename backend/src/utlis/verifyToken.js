const jwt = require("jsonwebtoken");
const { createError } = require("../utlis/error.js");

exports.verifyToken = (req, res, next) => {
  //console.log(req.headers.authorization)
  //1) check token exist or not.
  // const token = req.cookies.access_token;
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  //2) If token exist, verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //2.1)) if token exist but not valid
    if (err) return next(createError(403, "Token is not valid!"));
    //2.2)) if token exist but valid
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.id === req.user.role) {
    next();
  } else {
    return next(createError(403, "You are not authorized as admin."));
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (req.user.role) {
    next();
  } else {
    return next(createError(403, "You are not authorized as admin."));
  }
};
