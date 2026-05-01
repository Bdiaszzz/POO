class Parquimetro {
  constructor() {
    this.tabela = [
      { valor: 8.0, tempo: 120 },
      { valor: 4.0, tempo: 60 },
      { valor: 2.0, tempo: 30 },
    ];
  }

  processarPagamento(valorInserido) {
    if (isNaN(valorInserido) || valorInserido <= 0) {
      return { erro: "Digite um valor válido!" };
    }

    if (valorInserido < 2.0) {
      return { erro: "Valor insuficiente (Mínimo R$ 2,00)" };
    }

    let tempoObtido = 0;
    let troco = 0;
    let valorUtilizado = 0;

    for (let faixa of this.tabela) {
      if (valorInserido >= faixa.valor) {
        tempoObtido = faixa.tempo;
        valorUtilizado = faixa.valor; 
        troco = valorInserido - faixa.valor; 
        break;
      }
    }

    return {
      tempo: tempoObtido,
      troco: parseFloat(troco.toFixed(2)),
      valorPago: valorInserido,
      valorUtilizado: valorUtilizado, 
    };
  }
}

const meuParquimetro = new Parquimetro();

function calcularTempo() {
  const inputValor = document.getElementById("valor");
  const inputTempo = document.getElementById("tempo");
  const inputTempoDisponivel = document.getElementById("tempo-disponivel");
  const inputValorTotal = document.getElementById("valor-total");

  const valor = parseFloat(inputValor.value);
  const resultado = meuParquimetro.processarPagamento(valor);

  if (resultado.erro) {
    alert(resultado.erro);
    inputTempo.value = "";
    inputTempoDisponivel.value = "";
    inputValorTotal.value = "";
    return;
  }

  
  let mensagem = `${resultado.tempo} min`;
  if (resultado.troco > 0) {
    mensagem += ` (Troco: R$ ${resultado.troco.toFixed(2)})`;
  }
  inputTempo.value = mensagem;

  
  inputTempoDisponivel.value = `⏱️ Tempo disponível: ${resultado.tempo} minutos`;

  
  inputValorTotal.value = `💰 Valor total: R$ ${resultado.valorUtilizado.toFixed(2)}`;
}

function LimparCampos() {
  document.getElementById("valor").value = "";
  document.getElementById("tempo").value = "";
  document.getElementById("tempo-disponivel").value = "";
  document.getElementById("valor-total").value = "";

  const mensagemTroco = document.getElementById("mensagem-troco");
  if (mensagemTroco) {
    mensagemTroco.textContent = "";
  }

  document.getElementById("valor").focus();
}


document.addEventListener('DOMContentLoaded', function() {
  const inputValor = document.getElementById("valor");
  
  if (inputValor) {
    inputValor.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        calcularTempo();
      }
    });
  }
});
