const erroresNolineales = (w, numeroCapas, errL) => {
    w.reverse();
    let errNo = [];
    let SumErrNo = 0;
    for (let c = 0; c < numeroCapas; c++) {
      errNo.push([]);
      console.log("error nol i",errNo);
      for (let l = 0; l < w[c].length; l++) {
        SumErrNo = 0;
        for (let k = 0; k < w[c][0].length; k++) {
          SumErrNo += errL[k] * w[c][l][k];
        }
        errNo[c][l] = +SumErrNo.toFixed(5);
      }
      errL = errNo[c];
    }
    return errNo;
  };
  module.exports={erroresNolineales}