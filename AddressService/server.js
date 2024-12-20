const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("../proto/services.proto");
const proto = grpc.loadPackageDefinition(packageDefinition);

const addressService = {
  GetAddress: (call, callback) => {
    const adress = {
      addressId: call.request.addressId,
      name: "Sample Address",
    };
    callback(null, adress);
  },
};

const server = new grpc.Server();
server.addService(proto.AddressService.service, addressService);
server.bindAsync(
  "0.0.0.0:50054",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
    } else {
      console.log(`Address Service running on port ${port}`);
      // Now start the server after binding it
    //   server.start();
    }
  }
);
