const retornarUno = () => {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
};
function pausar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generarValoresAleatorios(numEntradas, numSalidas) {
  const valores = [];
  for (let i = 0; i < numEntradas; i++) {
    const fila = [];
    for (let j = 0; j < numSalidas; j++) {
      fila.push(+(Math.random() * 2 - 1).toFixed(1)); // Genera un número aleatorio entre -1 y 1
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
  DxFactivacion
) => {
  for (let c = 0; c < numeroCapas + 1; c++) {
    //numcapas
    for (let j = 0; j < w[c][0].length; j++) {
      for (let i = 0; i < w[c].length; i++) {
        let sumW = 0;
        if (c === 0) {
          console.log(
            `${w[c][i][j]} +2 *${rata} *${erroresNol[c][j]} * ${salidas[c].h[j]} * ${copiaPatron[c][i]}`
          );
          sumW =
            w[c][i][j] +
            2 *
              rata *
              erroresNol[c][j] *
              DxFactivacion(fa[c], salidas[c].h[j].toFixed(5)) *
              copiaPatron[c][i];
          w[c][i][j] = +sumW.toFixed(5);
          // l++
        } else {
          console.log("como entro suma ",sumW);
          if (salidas.length === c + 1) {
            console.log(
              `caps ${w[c][i][j]} +2 *${rata} * ${errL[j]} * ${
                salidas[c - 1].h[i]
              }`
            );
            sumW = w[c][i][j] + 2 * rata * errL[j];
            salidas[c - 1].h[i];
            console.log("peso anterior,", w[c][i][j],);
            w[c][i][j] = +sumW.toFixed(5);
            console.log("peso despues,", w[c][i][j]);
          } else {
            console.log(
              `cap2 ${w[c][i][j]} +2 *${rata} *${erroresNol[c][j]} * ${
                salidas[c].h[j]
              } * ${salidas[c - 1].h[i]}`
            );
            sumW =
              w[c][i][j] +
              2 *
                rata *
                erroresNol[c][j] *
                DxFactivacion(fa[c], salidas[c].h[j].toFixed(5)) *
                salidas[c - 1].h[i];
            w[c][i][j] = +sumW.toFixed(5);
          }
        }
      }
    }
    console.log("nuevo peso =", w);
  }
};
module.exports = { retornarUno, pausar, generarValoresAleatorios, wNew };
