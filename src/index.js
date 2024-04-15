const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { eventos } = require("./sockets/eventos");
const { pausar } = require("./libs/funciones");
const { data } = require("./data/data");
const { entrenar } = require("./libs/algortimo1");
const { log } = require("node:console");
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
    // console.log(datosTraining);
    const {data,rata,errorMaximo,iteracion} =datosTraining
    // await entrenar(data, 0.01, 0.01, io,100);
    await entrenar(data,rata,errorMaximo,io,iteracion)
  });
});
server.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
});
