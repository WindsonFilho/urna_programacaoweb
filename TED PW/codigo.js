let seuVotoPara = document.querySelector(".divisao-1-1 span");
let cargo = document.querySelector(".divisao-1-2 span");
let descricao = document.querySelector(".divisao-1-4");
let aviso = document.querySelector(".divisao-2");
let lateral = document.querySelector(".divisao-1-direita");
let numeros = document.querySelector(".divisao-1-3");

let etapaAtual = 0;
let numero = "";
let votoBranco = false;

function comecarEtapa() {
  let etapa = etapas[etapaAtual];

  let numeroHtml = "";
  numero = "";
  votoBranco = false;
  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml += '<div class="numero pisca"></div>';
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }
  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `Nome:${candidato.nome}</br>Estilo_Musical: ${candidato.Estilo_Musical}`;

    let fotoHtml = "";
    for (let i in candidato.foto) {
      fotoHtml += `<div class="divisao-1-imagem"><img src="imagens/Imagens TED artistas/${candidato.foto[i].url}" alt=""/>${candidato.foto[i].legenda}</div>`;
    }
    lateral.innerHTML = fotoHtml;
  } else {
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = '<div class= "aviso-grande pisca">VOTO NULO</div>';
  }
}

function clicou(n) {
  let elNumero = document.querySelector(".numero.pisca");
  if (elNumero !== null) {
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elNumero.classList.remove("pisca");
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add("pisca");
    } else {
      atualizaInterface();
    }
  }
}
function branco(n) {
  numero = "";
  votoBranco = true;
  seuVotoPara.style.display = "block";
  aviso.style.display = "block";
  numeros.innerHTML = "";
  descricao.innerHTML = '<div class= "aviso-grande pisca">VOTO EM BRANCO</div>';
  lateral.innerHTML = "";
}
function corrige(n) {
  comecarEtapa();
}
function confirma(n) {
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;

  if (votoBranco === true) {
    let votoConfirmado = true;
    console.log("Confirmando voto em Branco");
    comecarEtapa();
  } else if (numero.length === etapa.numeros) {
    let votoConfirmado = true;
    console.log("Confirmando voto no candidato " + numero);
    comecarEtapa();
  }

  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector(".tela").innerHTML =
        '<div class= "aviso-gigante pisca">FIM</div>';
    }
  }
}

comecarEtapa();
