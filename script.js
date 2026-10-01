// getElementById
var campoNome = document.getElementById("nome");
var btnIniciar = document.getElementById("btnIniciar");
var btnProximo = document.getElementById("btnProximo");
var inicio = document.getElementById("inicio");
var quiz = document.getElementById("quiz");
var placar = document.getElementById("placar");

// getElementsByTagName
var titulo = document.getElementsByTagName("h1")[0];
var textos = document.getElementsByTagName("p");

// querySelectorAll
var perguntas = document.querySelectorAll(".pergunta");
var opcoes = document.querySelectorAll(".opcao");

var atual = 0;
var acertos = 0;
var respondida = false;
var comecou = false;

// input: mostra o nome no título e libera o botão
campoNome.addEventListener("input", function () {
  var nome = campoNome.value.trim();
  if (nome == "") {
    titulo.textContent = "Mini Quiz";
    btnIniciar.disabled = true;
  } else {
    titulo.textContent = "Mini Quiz de " + nome;
    btnIniciar.disabled = false;
  }
});

// click: iniciar o quiz
btnIniciar.addEventListener("click", function () {
  titulo.textContent = "Quiz iniciado, " + campoNome.value.trim() + "!";
  inicio.classList.add("escondida");
  quiz.classList.remove("escondida");
  comecou = true;
  mostrarPergunta();
});

function mostrarPergunta() {
  for (var i = 0; i < perguntas.length; i++) {
    perguntas[i].classList.add("escondida");
  }
  perguntas[atual].classList.remove("escondida");
  respondida = false;
  btnProximo.disabled = true;

  if (atual == perguntas.length - 1) {
    btnProximo.textContent = "Ver resultado";
  }
}

// mouseover e mouseout nas perguntas
for (var i = 0; i < textos.length; i++) {
  textos[i].addEventListener("mouseover", function () {
    this.classList.add("vermelha");
  });
  textos[i].addEventListener("mouseout", function () {
    this.classList.remove("vermelha");
  });
}

// eventos nas alternativas
for (var j = 0; j < opcoes.length; j++) {
  opcoes[j].addEventListener("mouseover", function () {
    this.classList.add("destaque");
  });
  opcoes[j].addEventListener("mouseout", function () {
    this.classList.remove("destaque");
  });
  opcoes[j].addEventListener("click", function () {
    escolher(this);
  });
}

function escolher(opcao) {
  if (respondida) {
    return;
  }
  respondida = true;

  if (opcao.getAttribute("data-correta") == "sim") {
    opcao.classList.add("correta");
    acertos++;
  } else {
    opcao.classList.add("errada");
    // getElementsByClassName: procura a alternativa certa da pergunta
    var lista = perguntas[atual].getElementsByClassName("opcao");
    for (var k = 0; k < lista.length; k++) {
      if (lista[k].getAttribute("data-correta") == "sim") {
        lista[k].classList.add("correta");
      }
    }
  }

  btnProximo.disabled = false;
}

// click: próxima pergunta
btnProximo.addEventListener("click", proxima);

function proxima() {
  atual++;
  if (atual < perguntas.length) {
    mostrarPergunta();
  } else {
    comecou = false;
    quiz.classList.add("escondida");
    placar.classList.remove("escondida");
    titulo.textContent = "Resultado";
    placar.textContent = campoNome.value.trim() + ", você acertou " + acertos + " de " + perguntas.length + " perguntas.";
  }
}

// keydown: mostra a tecla no console e Enter avança
document.addEventListener("keydown", function (evento) {
  console.log("Tecla pressionada: " + evento.key);

  if (evento.key == "Enter" && comecou && respondida) {
    evento.preventDefault();
    proxima();
  }
});
