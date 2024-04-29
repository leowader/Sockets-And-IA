const { Factivacion } = require("../libs/Factivacion");
const { getConfigurations } = require("../data/repositoryConfiguration");
const simular = async (data) => {
  const { entradas, numSalidas, numPatrones, salidas } = data;
  let h = 0;
  let H = [];
  let salidasred = [];
  let numeroCapas = 3;
  const mipatron = entradas.slice();
  const res = await getConfigurations();
  let u = res[1].u;
  let w = res[1].w;
  let fa= res[1].fa
  for (let p = 0; p < numPatrones; p++) {
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
        H.push(parseFloat(Factivacion(fa[c], (h - u[c][i])).toFixed(1)));
      }
    }
    salidasred.push(H);
  }

  return {data: salidasred}
};
module.exports = { simular };
