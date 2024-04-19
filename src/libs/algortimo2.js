const { data2 } = require("../data/data");
const { Factivacion } = require("./Factivacion");
const backPropagation = () => {
  const {
    numEntradas,
    numPatrones,
    neuC1,
    numeroCapas,
    neuC2,
    numSalidas,
    entradas,
    w,
    u,
    fa,
  } = data2;
  let h = 0;
  let hi = 0;
  let H = [];
  let salidas = [];
  for (let p = 0; p < 1; p++) {
    for (let c = 0; c < numeroCapas+1; c++) {
      console.log("tamaño", w[c][0].length);
      for (let i = 0; i < w[c][0].length; i++) {
        h = 0; //reiniciar suma
        console.log("leennn", w[c].length);
        console.log("long", w[c]);
        for (let j = 0; j < w[c].length; j++) {
          console.log(`W ${w[c][j]} `);
          h += entradas[p][j] * w[c][j][i];
        }
        hi = h - u[c][i];
        H.push(+Factivacion(fa[c], hi).toFixed(4));
      }
      entradas[c] = H;
      salidas.push({ h: H });
      H = [];
    }
  }
  console.log("salidas", salidas);
};
module.exports = { backPropagation };
