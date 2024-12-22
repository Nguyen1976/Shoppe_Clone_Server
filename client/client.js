//Cấu hình gRPC Clients
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/services.proto");
const proto = grpc.loadPackageDefinition(packageDefinition);
const express = require("express");
const app = express();

app.use(express.json());

//Khởi tạo gRPC Clients
// const productClient = new proto.ProductService(
//   "localhost:50051",
//   grpc.credentials.createInsecure() //grpc.credentials.createInsecure(): Được sử dụng để tạo kết nối không bảo mật với các service (chỉ sử dụng trong môi trường phát triển, không sản xuất).
// );
// const addressClient = new proto.AddressService(
//   "localhost:50054",
//   grpc.credentials.createInsecure()
// );
const userClient = new proto.UserService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);
// const orderClient = new proto.OrderService(
//   "localhost:50053",
//   grpc.credentials.createInsecure()
// );

app.post("/api/user/sign-up", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  userClient.createUser(
    {name, email, password, confirmPassword },
    (error, response) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(200).json(response);
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
