const sigmoide = (suma) => {
  return 1 / (1 + Math.exp(-suma));
};
function derivaSigmoide(x) {
  return Math.exp(-x) / Math.pow(1 + Math.exp(-x), 2);
}
const tanh = (suma) => {
  // estoy esperando que me ayudes con la tangente hipérbolica
  const tanH = Math.tanh(suma);
  // console.log("suma en tan", suma);
  //   console.log("tan,",Math.tanh(0.74));
  return Math.tanh(suma); // derivada
};
const seno = (suma) => {
  // console.log("suma, seno", suma);
  suma = suma * (Math.PI / 180);
  return Math.sin(suma); //derivada seno
};
const lineal = (suma) => {
  return suma;
};
const Factivacion = (nameFncion, suma) => {
  if (nameFncion === "sigmoide") {
    return sigmoide(suma);
  }

  if (nameFncion === "tangente") {
    return tanh(suma);
  }
  if (nameFncion === "seno") {
    return seno(suma);
  }
};
module.exports = { Factivacion };
