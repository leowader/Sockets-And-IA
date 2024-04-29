const express = require("express");
const routes = express.Router();
const multer = require("multer");
const fs = require("fs");
const { guardarTxt } = require("../libs/funciones");
const upload = multer({ dest: "./src/uploads/" });
const { simular } = require("../libs/simulacion");
const { data2 } = require("../data/data");

routes.get("/simular", async (_, res) => {
  res.send(await simular(data2));
});

routes.post("/leer/wyu", upload.single("file"), async (req, res) => {
  const ruta = guardarTxt(req.file, fs);
  fs.readFile(ruta, "utf-8", (err, data) => {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send({ data: JSON.parse(data)});
    }
  });
});

routes.get("/", (_req, res) => {
  res.send({ mensaje: "bienbenido al servidor de leowader" });
});

module.exports = routes;
