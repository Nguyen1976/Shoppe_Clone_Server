const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('../proto/services.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const productService = {
    GetProduct: (call, callback) => {
        const product = {
            productId: call.request.productId,
            name: "Sample Product",
            price: 19.99,
        };
        callback(null, product);
    },
};

const server = new grpc.Server();
server.addService(proto.ProductService.service, productService);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
    } else {
      console.log(`Product Service running on port ${port}`);
      // Now start the server after binding it
    //   server.start();
    }
  }
);
