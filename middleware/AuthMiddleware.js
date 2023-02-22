const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

exports.Protected = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      // Get Token From Header
      token = authHeader.split(" ")[1];
      //   Verify Token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      //   Get User From Token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send(error.message);
    }
  }
  if (!token) {
    res.status(401).send({message: "Not Authorized"});
  }
};
