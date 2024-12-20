const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/services.proto");
const proto = grpc.loadPackageDefinition(packageDefinition);

const userService = {
  GetUser: (call, callback) => {
    const user = {
      userId: call.request.userId,
      name: "John Doe",
      email: "johndoe@example.com",
    };
    callback(null, user);
  },
};

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
      // Now start the server after binding it
      // server.start();
    }
  }
);
