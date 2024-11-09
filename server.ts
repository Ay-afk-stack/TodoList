import app from "./src/app";
import envConfig from "./src/config/config";
import connecttoDatabase from "./src/database/connection";
import { Server } from "socket.io";

const startServer = () => {
  const port = envConfig.port || 4000;
  const server = app.listen(port, () => {
    connecttoDatabase();
    console.log("Listening at http://localhost:" + port);
  });
  const io = new Server(server);
  io.on("connection", () => {
    console.log("Someone connected (Client)");
  });
};

startServer();
