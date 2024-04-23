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
    console.log("mi patron",it, mipatron);
    //numpatrones
    console.log("ententradas presentado ", it, mipatron[it]);
    H = [];
    salidasred = [];
    errL = [];
    console.log("pesos init ", it, w);
    console.log("error lineal init", it, errL);
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
        console.log(`e= ${mipatron}`);
        H.push(parseFloat(Factivacion(fa[c], hi).toFixed(5)));
      }
      salidasred.push({ h: H });
    }
    let yr = salidasred[salidasred.length - 1];
    let sumError = 0;
    console.log("yr =", yr);
    for (let i = 0; i < yr.h.length; i++) {
      errL.push(salidas[it][i] - yr.h[i]); //calculamos el error lineal en elentradas
      sumError += Math.abs(salidas[it][i] - yr.h[i]);
    }
    ep.push(+(sumError / numSalidas).toFixed(5));
    console.log("error lineal :", errL);
    console.log("ep: ", ep);
    console.log("las H", salidasred);
    let erroresNol = erroresNolineales(w, numeroCapas, errL);
    console.log("Errores no lineales", erroresNol.reverse());
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
    console.log("ultimos pesos", w);
    console.log("ultimos umbrales", u);
    console.log("ep: ", ep);
  }
  let sumErIt = 0;
  for (let i = 0; i < ep.length; i++) {
    sumErIt += ep[i];
  }
  console.log("error iteracion", +(sumErIt / ep.length).toFixed(5));
  return +(sumErIt / ep.length).toFixed(5);
};
const iteraciones = () => {
  const { entradas } = data2;
  console.log("ententradas", entradas);
  const iteraciones = 3;//colocar numero de iteraciones aqui
  let erroresIteracion=[]
  for (let i = 0; i < iteraciones; i++) {
    erroresIteracion.push(backPropagation(data2, 0.7))
  }
  console.log("erors it: ",erroresIteracion);
};
module.exports = { iteraciones };