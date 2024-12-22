// server/index.js
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/services.proto");
const proto = grpc.loadPackageDefinition(packageDefinition);

const userService = require("./src/services/userService");

const server = new grpc.Server();
server.addService(proto.UserService.service, userService);

server.bindAsync(
  "0.0.0.0:50052",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
    } else {
      console.log(`User Service running on port ${port}`);
      // server.start();
    }
  }
);
