const { data2 } = require("../data/data");
const { Factivacion, DxFactivacion } = require("./Factivacion");
const { wNew } = require("./funciones");
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
        mipatron[it]=H
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
    // console.log("error lineal :", errL);
    // console.log("ep: ", ep);
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
    // console.log("ultimos pesos", w);
    // console.log("ultimos umbrales", u);
    // console.log("ep: ", ep);
  }
  let sumErIt = 0;
  for (let i = 0; i < ep.length; i++) {
    sumErIt += ep[i];
  }
  return +(sumErIt / ep.length).toFixed(5);
};
const iteraciones = () => {
  const iteraciones = 5;//colocar numero de iteraciones aqui
  const errorPermitido=0.1
  const rata =0.1
  let erroresIteracion=[]
  console.log("--ALGORITMO 02 BACKPROPAGATION--");
  for (let i = 0; i < iteraciones; i++) {
    let err=+backPropagation(data2, rata).toFixed(2)
    erroresIteracion.push(err)
    console.log(`Error iteracion ${i+1} = ${err}`);
    if (+err.toFixed(2)<=+errorPermitido.toFixed(2)) {
      console.log("Entrenamiento completado corrctamente");
      break
    }
  }
  console.log("erros it:",erroresIteracion);
};
module.exports = { iteraciones };