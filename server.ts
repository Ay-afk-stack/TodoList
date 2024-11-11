import app from "./src/app";
import envConfig from "./src/config/config";
import connecttoDatabase from "./src/database/connection";
import { Server } from "socket.io";

//post-on
//get-emit
//request-socket
//routing-event

let io: Server | undefined;

const startServer = () => {
  const port = envConfig.port || 4000;
  const server = app.listen(port, () => {
    connecttoDatabase();
    console.log("Listening at http://localhost:" + port);
  });
  io = new Server(server);
};

function getSocketIo() {
  if (!io) {
    console.error("Socket IO not initialized!");
    return;
  }
  return io;
}
startServer();

export { getSocketIo };
