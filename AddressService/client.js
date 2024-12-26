const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/services.proto");
const proto = grpc.loadPackageDefinition(packageDefinition);

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
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = {
  // productClient,
  // addressClient,
  userClient,
};
