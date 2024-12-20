const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/services.proto");
const proto = grpc.loadPackageDefinition(packageDefinition);

const orderService = {
  CreateOrder: (call, callback) => {
    const order = {
      orderId: call.request.orderId,
      status: "Created",
    };
    callback(null, order);
  },
};

const server = new grpc.Server();

server.addService(proto.OrderService.service, orderService);

server.bindAsync(
  "0.0.0.0:50053",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
    } else {
      console.log(`Order Service running on port ${port}`);
      // Now start the server after binding it
    //   server.start();
    }
  }
);
