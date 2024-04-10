const inputCPF = document.querySelector("#inputCPF");
const btnValidaCpf = document.querySelector("#btnValidaCpf");
const resultado = document.querySelector("#resultado");

btnValidaCpf.addEventListener("click", function (e) {
  if (!inputCPF.value) return;

  validaCPF(inputCPF.value);
});

inputCPF.addEventListener("keypress", function (e) {
  if (!(e.keyCode === 13)) return;
  if (!inputCPF.value) return;

  validaCPF(inputCPF.value);
});

function validaCPF(cpf) {
  if (typeof cpf === "undefined") return false;
  const cpfLimpo = cpf.replace(/\D+/g, "");
  const cpfParcial = cpfLimpo.slice(0, -2);
  if (cpfParcial.length !== 9) return false;

  const primDig = validaDV(cpfParcial);
  const segDig = validaDV(cpfParcial + primDig);

  setResultado(cpfIsValid(cpfLimpo, primDig, segDig));
}

function validaDV(cpf) {
  let regressivo = cpf.length + 1;
  const total = Array.from(cpf).reduce((ac, val) => {
    ac += regressivo * Number(val);
    regressivo--;
    return ac;
  }, 0);

  digito = 11 - (total % 11);
  return digito > 9 ? 0 : digito;
}

function cpfIsValid(cpf, primDig, segDig) {
  if (cpf.slice(-2, cpf.length) !== primDig.toString() + segDig.toString())
    return false;
  return true;
}

function setResultado(ehValido) {
  if (ehValido) {
    resultado.innerText = "Este CPF é válido";
    resultado.classList.add("good");
    resultado.classList.remove("bad");
    return;
  }
  resultado.innerText = "Este CPF não é válido";
  resultado.classList.add("bad");
  resultado.classList.remove("good");
}

function limpaInput() {
  inputCPF.value = "";
  resultado.innerText = "";
  resultado.classList.remove("bad");
  resultado.classList.remove("good");
}
