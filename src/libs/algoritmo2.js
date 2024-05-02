const { Factivacion, DxFactivacion } = require("./Factivacion");
const {
  wNew,
  pausar,
  redondear,
  generarValoresAleatorios,
} = require("./funciones");
const { saveConfiguration } = require("../data/repositoryConfiguration");
const { erroresNolineales } = require("./errorNol");
const backPropagation = (data, rata) => {
  const { numeroCapas, w, u, fa, entradas, numSalidas, numPatrones, salidas } =
    data;
  let h = 0;
  let hi = 0;
  let H = [];
  let salidasred = [];
  const mipatron = entradas.slice();
  let errL = [];
  let ep = [];
  for (let p = 0; p < numPatrones; p++) {
    H = [];
    salidasred = [];
    errL = [];
    for (let c = 0; c < numeroCapas + 1; c++) {
      if (H.length > 0) {
        mipatron[p] = H;
        H = [];
      }
      for (let i = 0; i < w[c][0].length; i++) {
        h = 0; //reiniciar suma
        for (let j = 0; j < w[c].length; j++) {
          h += mipatron[p][j] * w[c][j][i];
        }
        hi = h - u[c][i];
        H.push(parseFloat(Factivacion(fa[c], hi)));
      }
      salidasred.push({ h: H });
    }
    let yr = salidasred[salidasred.length - 1];
    let sumError = 0;
    for (let i = 0; i < yr.h.length; i++) {
      errL.push(salidas[p][i] - yr.h[i]); //calculamos el error lineal capa de salidas
      sumError += Math.abs(salidas[p][i] - yr.h[i]);
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
const algoritmo02 = async (iteraciones, errorPermitido, rata, data, io) => {
  let erroresIteracion = [];
  console.log("--ALGORITMO 02 BACKPROPAGATION--");
  for (let i = 0; i < iteraciones; i++) {
    const { error, w, u } = backPropagation(data, rata);
    erroresIteracion.push(+error.toFixed(5));
    console.log(`Itereacion ${i} error: ${error}`);
    io.emit("graficas", {
      iteracion: `iteracion ${i}`,
      error: redondear(error, 5),
      w: i === iteraciones - 1 ? w : "",
      u: i === iteraciones - 1 ? u : "",
    });

    if (redondear(error, 2) <= redondear(errorPermitido, 2)) {
      console.log(+error.toFixed(2), "<=", +errorPermitido.toFixed(2));
      console.log("Entrenamiento completado corrctamente");
      await saveConfiguration({
        w: w,
        u: u,
        numeroCapas: data.numeroCapas,
        fa: data.fa,
      });
      break;
    }
    await pausar(0);
  }
};
module.exports = { algoritmo02 };
