const express = require("express");
const routes = express.Router();
const multer = require("multer");
const fs = require("fs");
const { guardarTxt } = require("../libs/funciones");
const upload = multer({ dest: "./src/uploads/" });
const { simular } = require("../libs/simulacion");
const { data2 } = require("../data/data");
const { getConfigurations } = require("../data/repositoryConfiguration");

routes.post("/simular", async (req, res) => {

  const { entradas, u, w, fa, numeroCapas } = req.body;
  const configuracion = {
    u,
    w,
    fa,
    numeroCapas,
  };
  console.log(entradas);
  const config = await getConfigurations();
  console.log("simulacion",await simular(data2, configuracion));
  res.send(await simular(data2, configuracion));
});
routes.get("/configurations", async (_, res) => {
  res.send({ data: await getConfigurations() });
});
routes.post("/leer/wyu", upload.single("file"), async (req, res) => {
  const ruta = guardarTxt(req.file, fs);
  fs.readFile(ruta, "utf-8", (err, data) => {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send({ data: JSON.parse(data) });
    }
  });
});

routes.get("/", (_req, res) => {
  res.send({ mensaje: "bienbenido al servidor de leowader" });
});

module.exports = routes;
