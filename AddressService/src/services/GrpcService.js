const db = require("../database/db");

const GrpcService = {
  getAddress: (call, callback) => {
    const sql = "SELECT * FROM address WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error getting user from database:", err);
        return callback({ message: "Lỗi khi lấy người dùng" });
      }
      return callback(null, { data: result });
    });
  },
};

module.exports = GrpcService;
