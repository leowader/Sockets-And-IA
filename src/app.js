require("./data/db.config");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { eventos } = require("./sockets/eventos");
const { algoritmo02 } = require("./libs/algoritmo2");
const express = require("express");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
app.use("/",require("./routes/routes"))
io.on("connection", async (socket) => {
  eventos(socket, io);
  socket.on("graficar", (data) => {
    console.log(data);
  });
  socket.on("graficas", async (datosTraining) => {
    const { data, rata, errorMaximo, iteracion, algoritmo } = datosTraining;
    if (iteracion > 0 && data.salidas.length > 0) {
      if (algoritmo === 2) {
        await algoritmo02(iteracion, errorMaximo, rata, data, io);
      }
      // await entrenar(data, rata, errorMaximo, io, iteracion);
    }
  });
});
module.exports = server;
