const jwt = require("jsonwebtoken");

const generateAccessToken = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.ACCESSTOKEN, {
      expiresIn: "30d",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error); // In lỗi nếu có
  }
};

// Tạo Refresh Token
const generateRefreshToken = async (payload) => {
  return jwt.sign(payload, process.env.REFRESHTOKEN, {
    expiresIn: "360d",
  });
};

// Dịch vụ làm mới Access Token khi refresh token hợp lệ
const refreshTokenJwtService = async (token) => {
  try {
    // Xác minh refresh token
    const decoded = jwt.verify(token, process.env.REFRESHTOKEN);

    // Tạo access token mới
    const access_token = await generateAccessToken({
      id: decoded.id,
      isAdmin: decoded.isAdmin,
    });

    return {
      status: "OK",
      message: "SUCCESS",
      access_token,
    };
  } catch (err) {
    return {
      status: "ERR",
      message: "Authentication failed",
    };
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshTokenJwtService,
};
