const db = require("../database/db");

const userService = {
  createUser: (call, callback) => {
    const { name, email, password, confirmPassword } = call.request;
    if (password !== confirmPassword) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: "Mật khẩu và xác nhận mật khẩu không khớp",
      });
    }

    const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
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
};

module.exports = userService;
