const { data2 } = require("../data/data");
const { Factivacion } = require("./Factivacion");
const {erroresNolineales} =require("./errorNol")
const backPropagation = (data2, patron, yd) => {
  const { numeroCapas, w, u, fa, numSalidas, numPatrones } = data2;
  let h = 0;
  let hi = 0;
  let H = [];
  let salidas = [];
  let errL = [];
  let entradasCap = patron;
  let ep = [];
  for (let it = 0; it < 1; it++) { //numpatrones
    let entradasCap = patron;
    H = [];
    salidas = [];
    for (let c = 0; c < numeroCapas + 1; c++) {
      if (H.length > 0) {
        entradasCap[it] = H;
        H = [];
      }
      for (let i = 0; i < w[c][0].length; i++) {
        // console.log("ENTRADA PRESENTADA p: ",it,entradasCap[it]);
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
    console.log("erro no lineal ", erroresNolineales(w, numeroCapas, errL));
  }
  return salidas;
};

const iteraciones = () => {
  const { entradas, salidas } = data2;
  backPropagation(data2, entradas, salidas);
};
module.exports = { iteraciones };
