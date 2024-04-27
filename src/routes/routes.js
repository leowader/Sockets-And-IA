const express = require("express");
const routes = express.Router();
const multer = require("multer");
const fs = require("fs");
const { guardarTxt } = require("../libs/funciones");
const upload = multer({ dest: "./src/uploads/" });
routes.get("/ruta", (req, res) => {
  res.send({ mensaje: "ruta ok" });
});
routes.post("/leer/wyu", upload.single("file"), async (req, res) => {
  const ruta = guardarTxt(req.file, fs);
  fs.readFile(ruta, "utf-8", (err, data) => {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log("txt info",data);
    }
  });
  res.send({ mensaje: req.file });
});
routes.get("/", (_req, res) => {
  res.send({ mensaje: "bienbenido al servidor de leowader" });
});



module.exports = routes;
