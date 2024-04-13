const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { eventos } = require("./sockets/eventos");
const { pausar } = require("./libs/funciones");
const { data } = require("./data/data");
const { entrenar } = require("./libs/algortimo1");
const app = express();
const PORT = 4000;
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
app.get("/probar", (req, res) => {
  res.send({ mensaje: "bienbenido al servidor de leowader" });
});
io.on("connection", async (socket) => {
  eventos(socket, io);
  socket.on("graficar", (data) => {
    console.log(data);
  });
  socket.on("graficas", async () => {

    await entrenar(data, 0.7, 0.1, io);
  });
});
server.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});
