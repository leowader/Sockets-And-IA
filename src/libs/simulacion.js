const { Factivacion } = require("../libs/Factivacion");
const { redondear } = require("./funciones");
const simular = async (entradas, configuracion) => {
  const { u, w, fa, numeroCapas } = configuracion;
  let h = 0;
  let H = [];
  let salidasred = [];
  const mipatron = entradas.slice();
  for (let p = 0; p < entradas.length; p++) {
    H = [];
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
        H.push(parseFloat(Factivacion(fa[c], h - u[c][i]).toFixed(0)));
      }
    }
    salidasred.push(H);
  }
  console.log("salidas antes",salidasred);
  for (let i = 0; i < salidasred.length; i++) {
    if (salidasred[i] <= 0) {
      console.log("a",salidasred[0]);
      salidasred[i] = [0];
    }
  }
  console.log("salidas despues",salidasred);
  return { data: salidasred };
};
module.exports = { simular };
