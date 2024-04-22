const { data2 } = require("../data/data");
const { Factivacion, DxFactivacion } = require("./Factivacion");
const {wNew}=require("./funciones")
const { erroresNolineales } = require("./errorNol");
const backPropagation = (data2, patron, yd, rata) => {
  const { numeroCapas, w, u, fa, numSalidas, numPatrones, entradas } = data2;
  let h = 0;
  let hi = 0;
  let H = [];
  let salidas = [];
  let errL = [];
  let entradasCap = entradas;
  const copiaPatron = [...patron];
  let ep = [];
  for (let it = 0; it < 1; it++) {
    //numpatrones
    let entradasCap = entradas;
    H = [];
    salidas = [];
    for (let c = 0; c < numeroCapas + 1; c++) {
      if (H.length > 0) {
        entradasCap[it] = H;
        H = [];
      }
      for (let i = 0; i < w[c][0].length; i++) {
        h = 0; //reiniciar suma
        for (let j = 0; j < w[c].length; j++) {
          h += entradasCap[it][j] * w[c][j][i];
        }
        hi = h - u[c][i];
        H.push(parseFloat(Factivacion(fa[c], hi).toFixed(5)));
      }
      entradasCap[it] = H;
      salidas.push({ h: H });
    }
    let yr = salidas[salidas.length - 1];
    let sumError = 0;
    console.log("yr =", yr);
    console.log("yd: ", yd[it]);

    for (let i = 0; i < yr.h.length; i++) {
      errL.push(yd[it][i] - yr.h[i]); //calculamos el error lineal en el patron
      sumError += Math.abs(yd[it][i] - yr.h[i]);
    }
    ep.push(+(sumError / numSalidas).toFixed(5));
    console.log("error lineal :", errL);
    console.log("ep: ", ep);
    console.log("las H", salidas);
    let erroresNol = erroresNolineales(w, numeroCapas, errL);
    console.log("eee", erroresNol.reverse());
    w.reverse();
    console.log("loen", w[0][0]);
    console.log("loen2", w[1][0]);
    wNew(numeroCapas, w, salidas, copiaPatron, rata, erroresNol, fa, errL,DxFactivacion);
    // console.log("ultimos pesos",w);
  }
  return salidas;
};

const iteraciones = () => {
  const { entradas, salidas } = data2;
  backPropagation(data2, entradas, salidas, 0.7);
};
module.exports = { iteraciones };
