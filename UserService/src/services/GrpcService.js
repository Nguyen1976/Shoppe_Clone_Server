const db = require("../database/db");

const GrpcService = {
  getUser: (call, callback) => {
    const userId = call.request.userId;
    const sql = "SELECT * FROM user WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error getting user from database:", err);
        return callback({ message: "Lỗi khi lấy người dùng" });
      }
      const data = {
        name: result[0].name,
        email: result[0].email,
        isAdmin: result[0].isAdmin,
        phone: result[0].phone,
        avatar: result[0].avatar,
      };
      return callback(null, data);
    });
  },
};

module.exports = GrpcService;
