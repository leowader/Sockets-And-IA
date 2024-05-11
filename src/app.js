require("./data/db.config");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { eventos } = require("./sockets/eventos");
const { algoritmo02 } = require("./libs/algoritmo2");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '10mb'})); // Ajusta el límite según tus necesidades

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
const allowedOrigins = [
  "https://version-leo.vercel.app",
  "http://localhost:3000",
  "https://9rsknq83-5173.use.devtunnels.ms/"
];
app.use(cors());
app.use(express.json());
app.use("/", require("./routes/routes"));
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
