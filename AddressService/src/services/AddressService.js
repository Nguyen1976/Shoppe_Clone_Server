const db = require("../database/db");

const { userClient } = require("../../client");

const addressService = {
  createAddress: (req, res) => {
    const { userId, city, district, commune, address, isDefault, phone, name } =
      req.body;
    userClient.getUser({ userId }, (err, result) => {
      console.log(result);
      const sql =
        "INSERT INTO address (userId, city, district, commune, address, isDefault, phone, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

      db.query(
        sql,
        [userId, city, district, commune, address, isDefault, phone, name],
        (err, result) => {
          if (err) {
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.status(201).json({ message: "Address created" });
          }
        }
      );
    });
  },
};

module.exports = addressService;
