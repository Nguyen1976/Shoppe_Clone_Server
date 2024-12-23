const db = require("../database/db");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("./JwtService");

const userService = {
  createUser: (call, callback) => {
    const { name, email, password, confirmPassword } = call.request;
    if (password !== confirmPassword) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: "Mật khẩu và xác nhận mật khẩu không khớp",
      });
    }

    const hash = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hash], (err, result) => {
      if (err) {
        console.error("Error inserting user into database:", err);
        return callback({
          code: grpc.status.INTERNAL,
          details: "Lỗi khi lưu thông tin người dùng",
        });
      }

      const newUser = {
        name,
        email,
      };

      callback(null, newUser);
    });
  },

  loginUser: (call, callback) => {
    const { email, password } = call.request;
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Error querying user from database:", err);
        return callback({
          code: grpc.status.INTERNAL,
          details: "Lỗi khi truy vấn thông tin người dùng",
        });
      }

      if (result.length === 0) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Không tìm thấy người dùng",
        });
      }

      const user = result[0];
      if (!bcrypt.compareSync(password, user.password)) {
        return callback({
          code: grpc.status.UNAUTHENTICATED,
          details: "Sai mật khẩu",
        });
      }

      const accessToken = generateAccessToken({
        id: user.id,
        isAdmin: user.isAdmin,
      })

      const refreshToken = generateRefreshToken({
        id: user.id,
        isAdmin: user.isAdmin,
      });

      const userInfo = {
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken
      };

      callback(null, userInfo);
    });
  },
};

module.exports = userService;
