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
  DxFactivacion,
  u
) => {
  for (let c = 0; c < numeroCapas + 1; c++) {
    console.log("copia patron w",copiaPatron);
    //numcapas
    for (let j = 0; j < w[c][0].length; j++) {
      for (let i = 0; i < w[c].length; i++) {
        let sumW = 0;
        if (c === 0) {
          console.log(
            `w1 =${w[c][i][j]} +2 *${rata} *${erroresNol[c][j]} * ${salidas[c].h[j]} * ${copiaPatron[c][i]}`
          );
      console.log("");

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
          if (salidas.length === c + 1) {
            console.log(
              `ws ${w[c][i][j]} +2 *${rata} * ${errL[j]} * ${
                salidas[c - 1].h[i]
              }`
            );
            sumW = w[c][i][j] + 2 * rata * errL[j];
            salidas[c - 1].h[i];
            w[c][i][j] = +sumW.toFixed(5);
          } else {
            console.log(
              `w2 ${w[c][i][j]} +2 *${rata} *${erroresNol[c][j]} * ${
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
  }

  for (let c = 0; c < numeroCapas + 1; c++) {
    for (let j = 0; j < u[c].length; j++) {
      let sumU = 0;

      if (u.length - 1 === c) {
        console.log("ultima capa", u[c]);
        console.log(
          `Us= ${u[c][j]} +2 * ${rata} * ${errL[j]} * 1`
        );
        sumU = u[c][j] + 2 * rata * errL[j] * 1;
        u[c][j] = +sumU.toFixed(5);
       
      } else {
        sumU =
          u[c][j] +
          2 *
            rata *
            erroresNol[c][j] *
            DxFactivacion(fa[c], salidas[c].h[j].toFixed(5)) *
            1;
        console.log(
          `U1= ${u[c][j]} +2 * ${rata} * ${erroresNol[c][j]} * ${+salidas[c].h[
            j
          ].toFixed(5)} * 1`
        );
        u[c][j] = +sumU.toFixed(5);
      }
      console.log("suma u2 ", sumU);
    }
  }
  console.log("");
};
module.exports = { retornarUno, pausar, generarValoresAleatorios, wNew };
