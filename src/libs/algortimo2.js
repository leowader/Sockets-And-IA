const { data2 } = require("../data/data");
const { Factivacion } = require("./Factivacion");
const backPropagation = (data2, patron) => {
  const { numeroCapas, w, u, fa } = data2;
  let h = 0;
  let hi = 0;
  let H = [];
  let salidas = [];
  let entradasCap = patron;
  console.log("patron presentado ", entradasCap);
  for (let c = 0; c < numeroCapas + 1; c++) {
    if (H.length > 0) {
      entradasCap = H;
      H = [];
    }
    for (let i = 0; i < w[c][0].length; i++) {
      h = 0; //reiniciar suma
      for (let j = 0; j < w[c].length; j++) {
        h += entradasCap[j] * w[c][j][i];
      }
      hi = h - u[c][i];
      H.push(parseFloat(Factivacion(fa[c], hi).toFixed(5)));
    }
    entradasCap = H;
    salidas.push({ h: H });
  }
  return salidas;
};
const iteraciones = () => {
  const { entradas } = data2;

  for (let i = 0; i < entradas.length; i++) {
    console.log("salida", backPropagation(data2, entradas[i]));
  }
};
module.exports = { iteraciones };
