const jsonwebtoken = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Forbidden Access. No authorization header found.",
    });
  }

  const token = authHeader.split(" ")[1];
  jsonwebtoken.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        return res.status(403).send({
          success: false,
          message: "Session expired or wrong token. Please re-login.",
        });
      }
      
      req.decoded = decoded;
      next();
    }
  );
};

module.exports = verifyJWT;
