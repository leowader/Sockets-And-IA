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
module.exports = { retornarUno, pausar,generarValoresAleatorios };
