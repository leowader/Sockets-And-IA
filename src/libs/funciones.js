const path = require("path");
function pausar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generarValoresAleatorios(numEntradas, numSalidas) {
  const valores = [];
  for (let i = 0; i < numEntradas; i++) {
    const fila = [];
    for (let j = 0; j < numSalidas; j++) {
      fila.push(+(Math.random() * 2 - 1).toFixed(5));
    }
    valores.push(fila);
  }
  return valores;
}
const wNew = (
  numeroCapas,
  w,
  salidas,
  copiaPatron,
  rata,
  erroresNol,
  fa,
  errL,
  DxFactivacion,
  u
) => {
  for (let c = 0; c < numeroCapas + 1; c++) {
    //modificando pesos
    for (let j = 0; j < w[c][0].length; j++) {
      for (let i = 0; i < w[c].length; i++) {
        let sumW = 0;
        if (c === 0) {
          sumW =
            w[c][i][j] +
            2 *
              rata *
              erroresNol[c][j] *
              DxFactivacion(fa[c], salidas[c].h[j]) *
              copiaPatron[c][i];
          w[c][i][j] = redondear(sumW, 5);
        } else {
          if (salidas.length === c + 1) {
            sumW = w[c][i][j] + 2 * rata * errL[j];
            salidas[c - 1].h[i];
            w[c][i][j] = redondear(sumW, 5);
          } else {
            sumW =
              w[c][i][j] +
              2 *
                rata *
                erroresNol[c][j] *
                DxFactivacion(fa[c], salidas[c].h[j]) *
                salidas[c - 1].h[i];
            w[c][i][j] = redondear(sumW, 5);
          }
        }
      }
    }
  }
  //modificando umbrales
  for (let c = 0; c < numeroCapas + 1; c++) {
    for (let j = 0; j < u[c].length; j++) {
      let sumU = 0;
      if (u.length - 1 === c) {
        sumU = u[c][j] + 2 * rata * errL[j] * 1;
        u[c][j] = redondear(sumU, 5);
      } else {
        sumU =
          u[c][j] +
          2 *
            rata *
            erroresNol[c][j] *
            DxFactivacion(fa[c], salidas[c].h[j]) *
            1;
        u[c][j] = redondear(sumU, 5);
      }
    }
  }
};
function redondear(numero, decimales) {
  return Math.round(numero * Math.pow(10, decimales)) / Math.pow(10, decimales);
}
function guardarTxt(file, fs) {
  const ruta = `./src/uploads/${file.originalname}`;
  fs.renameSync(file.path, ruta);
  const txtPath = path.join(__dirname, `../uploads/${file.originalname}`);
  return txtPath;
}
const wNewCascada = (
  numeroCapas,
  w,
  salidas,
  copiaPatron,
  rata,
  erroresNol,
  fa,
  errL,
  DxFactivacion,
  u
) => {
  for (let c = 0; c < numeroCapas + 1; c++) {
    //modificando pesos
    for (let j = 0; j < w[c][0].length; j++) {
      for (let i = 0; i < w[c].length; i++) {
        let sumW = 0;
        if (c === 0) {
          sumW =
            w[c][i][j] -
            2 *
              rata *
              erroresNol[c][j] *
              DxFactivacion(fa[c], salidas[c].h[j]) *
              copiaPatron[c][i];
          w[c][i][j] = redondear(sumW, 5);
        } else {
          if (salidas.length === c + 1) {
            sumW = w[c][i][j] - 2 * rata * errL[j];
            salidas[c - 1].h[i];
            w[c][i][j] = redondear(sumW, 5);
          } else {
            sumW =
              w[c][i][j] -
              2 *
                rata *
                erroresNol[c][j] *
                DxFactivacion(fa[c], salidas[c].h[j]) *
                salidas[c - 1].h[i];
            w[c][i][j] = redondear(sumW, 5);
          }
        }
      }
    }
  }
  //modificando umbrales
  for (let c = 0; c < numeroCapas + 1; c++) {
    for (let j = 0; j < u[c].length; j++) {
      let sumU = 0;
      if (u.length - 1 === c) {
        sumU = u[c][j] - 2 * rata * errL[j] * 1;
        u[c][j] = redondear(sumU, 5);
      } else {
        sumU =
          u[c][j] -
          2 *
            rata *
            erroresNol[c][j] *
            DxFactivacion(fa[c], salidas[c].h[j]) *
            1;
        u[c][j] = redondear(sumU, 5);
      }
    }
  }
};
module.exports = {
  pausar,
  generarValoresAleatorios,
  wNew,
  wNewCascada,
  redondear,
  guardarTxt,
};
