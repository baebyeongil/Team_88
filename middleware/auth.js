const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization ?? "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(403).send({
      errorMessage: "로그인이 필요한 기능입니다.",
    });
    return;
  }

  try {
    const { id } = jwt.verify(authToken, "custom-secret-key");
    
    const user = await User.findOne({ where: { id:id } });
    if (!user) {
      res.clearCookie("Authorization");
      return res
        .status(401)
        .json({ message: "토큰 사용자가 존재하지 않습니다." });
    }
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.clearCookie("Authorization");
    res.status(403).send({
      errorMessage: "전달된 쿠키에서 오류가 발생하였습니다.",
    });
  }
};
