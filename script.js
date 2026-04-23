class Parquimetro {
  constructor() {
    this.tabela = [
      { valor: 3.0, tempo: 120 },
      { valor: 1.75, tempo: 60 },
      { valor: 1.0, tempo: 30 },
    ];
  }

  processarPagamento(valorInserido) {
    if (valorInserido < 1.0) {
      return { erro: "Valor insuficiente (Mínimo R$ 1,00)" };
    }

    let tempoObtido = 0;
    let troco = 0;

    for (let faixa of this.tabela) {
      if (valorInserido >= faixa.valor) {
        tempoObtido = faixa.tempo;
        troco = valorInserido - faixa.valor;
        break;
      }
    }

    return {
      tempo: tempoObtido,
      troco: troco.toFixed(2),
    };
  }
}

const meuParquimetro = new Parquimetro();

function calcularTempo() {
  const inputValor = document.getElementById("valor");
  const inputTempo = document.getElementById("tempo");

  const valor = parseFloat(inputValor.value);
  const resultado = meuParquimetro.processarPagamento(valor);

  if (resultado.erro) {
    alert(resultado.erro);
    inputTempo.value = "";
  } else {
    let mensagem = `${resultado.tempo} min`;
    if (resultado.troco > 0) {
      mensagem += ` (Troco: R$ ${resultado.troco})`;
    }
    inputTempo.value = mensagem;
  }
}
