const sigmoide = (suma) => {
  return 1 / (1 + Math.exp(-suma));
};

const tanh = (suma) => {
  return Math.tanh(suma);
};
const seno = (suma) => {
  suma = suma * (Math.PI / 180);
  return Math.sin(suma);
};
const lineal = (suma) => {
  return suma;
};
function derivaSigmoide(x) {
  return Math.exp(-x) / Math.pow(1 + Math.exp(-x), 2);
}
function derivaSigmoide(x) {
  return Math.exp(-x) / Math.pow(1 + Math.exp(-x), 2);
}
const derivadaTanH = (suma) => {
  return 1 - Math.tanh(suma) * Math.tanh(suma);
};
const derivadaSeno = (suma) => {
  suma = suma * (Math.PI / 180);
  return -Math.sin(Math.sin(suma)) * Math.cos(suma);
};
const DxFactivacion = (nameFncion, suma) => {
  if (nameFncion === "sigmoide") {
    return derivaSigmoide(suma);
  }

  if (nameFncion === "tangente") {
    console.log("llego a tan",suma);
    
    return derivadaTanH(suma);
  }
  if (nameFncion === "seno") {
    return derivadaSeno(suma);
  }
  if (nameFncion === "lineal") {
    return lineal(suma);
  }
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
  if (nameFncion === "lineal") {
    return lineal(suma);
  }
};
module.exports = { Factivacion, DxFactivacion };
