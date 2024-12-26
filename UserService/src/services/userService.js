const db = require("../database/db");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("./JwtService");

const userService = {
  createUser: (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }

    const hash = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hash], (err, result) => {
      if (err) {
        console.error("Error inserting user into database:", err);
        return res.status(500).json({ message: "Lỗi khi thêm người dùng" });
      }
      return res.status(200).json({ message: "Thêm người dùng thành công" });
    });
  },
};

module.exports = userService;
