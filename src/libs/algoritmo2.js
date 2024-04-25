const { data2 } = require("../data/data");
const { Factivacion, DxFactivacion } = require("./Factivacion");
const { wNew } = require("./funciones");
const {
  getConfigurations,
  saveConfiguration,
} = require("../data/repositoryConfiguration");
const { erroresNolineales } = require("./errorNol");
const backPropagation = (data2, rata) => {
  const { numeroCapas, w, u, fa, entradas, numSalidas, numPatrones, salidas } =
    data2;
  let h = 0;
  let hi = 0;
  let H = [];
  let salidasred = [];
  const mipatron = entradas.slice();
  let errL = [];
  // letentradas =entradas;
  let ep = [];
  for (let it = 0; it < numPatrones; it++) {
    //numpatrones
    H = [];
    salidasred = [];
    errL = [];
    for (let c = 0; c < numeroCapas + 1; c++) {
      if (H.length > 0) {
        // entradas[it] = H;
        mipatron[it] = H;
        H = [];
      }
      for (let i = 0; i < w[c][0].length; i++) {
        h = 0; //reiniciar suma
        for (let j = 0; j < w[c].length; j++) {
          h += mipatron[it][j] * w[c][j][i];
        }
        hi = h - u[c][i];
        H.push(parseFloat(Factivacion(fa[c], hi).toFixed(5)));
      }
      salidasred.push({ h: H });
    }
    let yr = salidasred[salidasred.length - 1];
    let sumError = 0;
    for (let i = 0; i < yr.h.length; i++) {
      errL.push(salidas[it][i] - yr.h[i]); //calculamos el error lineal en elentradas
      sumError += Math.abs(salidas[it][i] - yr.h[i]);
    }
    ep.push(+(sumError / numSalidas).toFixed(5));
    let erroresNol = erroresNolineales(w, numeroCapas, errL);
    erroresNol.reverse();
    w.reverse();
    wNew(
      numeroCapas,
      w,
      salidasred,
      entradas,
      rata,
      erroresNol,
      fa,
      errL,
      DxFactivacion,
      u
    );
  }
  let sumErIt = 0;
  for (let i = 0; i < ep.length; i++) {
    sumErIt += ep[i];
  }
  return { error: sumErIt / ep.length, w: w, u: u };
};
const iteraciones = async () => {
  const iteraciones = 1; //colocar numero de iteraciones aqui
  const errorPermitido = 0.1;
  const rata = 0.7;
  let erroresIteracion = [];
  console.log("--ALGORITMO 02 BACKPROPAGATION--");
  for (let i = 0; i < iteraciones; i++) {
    const { error, w, u } = backPropagation(data2, rata);
    erroresIteracion.push(+error.toFixed(2));
    if (+error.toFixed(2) <= errorPermitido) {
      console.log("Entrenamiento completado corrctamente");
      console.log("ultimo w", w);
      console.log("ultimo u", u);
      await saveConfiguration({
        w: w,
        u: u,
        numeroCapas: 2,
      });
      break;
    }
  }
  console.log("erros it:", erroresIteracion);
};
module.exports = { iteraciones };
