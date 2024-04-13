const data = {
  numEntradas: 3,
  numSalidas: 2,
  numPatrones: 5,
  W: [
    [0.7, 0.7],
    [0.1, 0.8],
    [0.9, 0.2],
  ],
  U: [0.3, -0.0],
  cabeceras: ["X1", "X2", "X3", "YD1", "YD2"],
  salidas: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  entradas: [
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],
};
const pesosBuenos = {
  w: [
    [0.7, 0.8],
    [0.3, -0.7],
    [-0.9, 0.8],
  ],
  u: [0.2, 0.6],
};
module.exports = { data ,pesosBuenos};
