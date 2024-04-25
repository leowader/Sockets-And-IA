const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { eventos } = require("./sockets/eventos");
const { iteraciones } = require("./libs/algoritmo2");
const { entrenar } = require("./libs/algoritmo1");
require("./data/db.config")
const app = express();
const PORT = 4000 | process.env.PORT;
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
  socket.on("graficas", async (datosTraining) => {
    console.log(datosTraining);
    const { data, rata, errorMaximo, iteracion } = datosTraining;
    if (iteracion > 0 && data.salidas.length > 0) {
      await entrenar(data, rata, errorMaximo, io, iteracion);
    }
  });
});

iteraciones();
server.listen(PORT, () => {

  console.log(`Running server on port ${PORT}`);
});
