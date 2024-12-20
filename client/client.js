//Cấu hình gRPC Clients
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/services.proto");
const proto = grpc.loadPackageDefinition(packageDefinition);
const express = require("express");
const app = express();

//Khởi tạo gRPC Clients
const productClient = new proto.ProductService(
  "localhost:50051",
  grpc.credentials.createInsecure() //grpc.credentials.createInsecure(): Được sử dụng để tạo kết nối không bảo mật với các service (chỉ sử dụng trong môi trường phát triển, không sản xuất).
);
const addressClient = new proto.AddressService(
  "localhost:50054",
  grpc.credentials.createInsecure()
);
const userClient = new proto.UserService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);
const orderClient = new proto.OrderService(
  "localhost:50053",
  grpc.credentials.createInsecure()
);

app.get("/api/product/:id", (req, res) => {
  const productId = req.params.id;

  productClient.GetProduct({ productId }, (err, response) => {
    if (err) {
      res.status(500).json({ error: "Error fetching product" });
    } else {
      res.json(response);
    }
  });
});

app.get("/api/user/:id", (req, res) => {
  const userId = req.params.id;

  userClient.GetUser({ userId }, (err, response) => {
    if (err) {
      res.status(500).json({ error: "Error fetching user" });
    } else {
      res.json(response);
    }
  });
});

app.post("/api/order", (req, res) => {
  const { ordeId, userId, productIds } = req.body;

  orderClient.CreateOrder({ ordeId, userId, productIds }, (err, response) => {
    if (err) {
      res.status(500).json({ error: "Error creating order" });
    } else {
      res.json(response);
    }
  });
});

app.get("/api/address/:id", (req, res) => {
  const { addressId } = req.params.id;

  addressClient.GetAddress({ addressId }, (err, response) => {
    if (err) {
      res.status(500).json({ error: "Error fetching address" });
    } else {
      res.json(response);
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
