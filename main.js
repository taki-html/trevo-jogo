const atividades = [
    { texto: 'Moagem dos grãos', cor: 'verde' },
    { texto: 'Cozimento do mosto', cor: 'verde' },
    { texto: 'Clarificação', cor: 'verde' },
    { texto: 'Centrifugação (whirlpool)', cor: 'verde' },
    { texto: 'Fervura', cor: 'verde' },
    { texto: 'Fermentação', cor: 'verde' },
    { texto: 'Maturação', cor: 'verde' },
    { texto: 'Envase', cor: 'verde' },
    { texto: 'Definir receita', cor: 'verde' },
    { texto: 'Medição de densidade', cor: 'verde' },
    { texto: 'Resfriamento até temperatura de fermentação', cor: 'verde' },
    { texto: 'Pasteurização', cor: 'amarelo' },
    { texto: 'Comprar materiais', cor: 'amarelo' },
    { texto: 'Limpeza e higienização', cor: 'amarelo' },
    { texto: 'Sanitização de equipamentos', cor: 'amarelo' },
    { texto: 'Reuniões de planejamento', cor: 'amarelo' },
    { texto: 'Recebimento de insumos', cor: 'amarelo' },
    { texto: 'Design do rótulo', cor: 'amarelo' },
    { texto: 'Repetição de medições', cor: 'amarelo' },
    { texto: 'Controle manual de temperatura', cor: 'amarelo' },
    { texto: 'Checklists mal preenchidos', cor: 'amarelo' },
    { texto: 'Atividades burocráticas desnecessárias', cor: 'vermelho' },
    { texto: 'Movimentação inútil de operadores', cor: 'vermelho' },
    { texto: 'Falhas na comunicação', cor: 'vermelho' },
    { texto: 'Inspeção excessiva', cor: 'vermelho' },
    { texto: 'Espera por manutenção', cor: 'vermelho' },
    { texto: 'Retrabalho ou correção de erros', cor: 'vermelho' },
    { texto: 'Reuniões longas sem ação', cor: 'vermelho' },
    { texto: 'Testes fora do padrão', cor: 'vermelho' },
    { texto: 'Espera por ordens', cor: 'vermelho' },
    { texto: 'Processos manuais', cor: 'vermelho' },
    { texto: 'Paradas por falta de insumos', cor: 'vermelho' },
    { texto: 'Esperas', cor: 'vermelho' }
  ];
  atividades.sort(() => Math.random() - 0.5);
  let jogadores = [], pontuacoes = [], sequencias = [], indice = 0, timer;
  let podeResponder = false;
  let rodadasTotais = 0;
  let jogadorAtualIndex = 0;

 function iniciarJogo() {
  const num = parseInt(document.getElementById('numJogadores').value);
  const rodadas = parseInt(document.getElementById('numRodadas').value);
  if (num < 1 || num > 6) {
    alert("Número inválido de jogadores. Escolha entre 1 e 6.");
    return;
  }
  if (isNaN(rodadas) || rodadas < 1) {
    alert("Número de rodadas inválido.");
    return;
  }

  rodadasTotais = rodadas * num; // cada jogador joga uma vez por rodada

  jogadores = [], pontuacoes = [], sequencias = [];
  for (let i = 0; i < num; i++) {
    jogadores.push(`Jogador ${i + 1}`);
    pontuacoes.push(0);
    sequencias.push(0);
  }

  jogadorAtualIndex = 0;
  indice = 0;

  document.getElementById("setup").style.display = "none";
  document.getElementById("jogo").style.display = "block";
  mostrarAtividade();
}
 function mostrarAtividade() {
  podeResponder = true;
  const atividadeEl = document.getElementById('atividade');
  atividadeEl.classList.remove("fade-in");         // Remove a classe (reseta animação)
  void atividadeEl.offsetWidth;                    // Força o reflow (gatilho de CSS)
  atividadeEl.textContent = atividades[indice].texto;
  atividadeEl.classList.add("fade-in");            // Adiciona a classe para animar
  document.getElementById('feedback').textContent = '';
  document.getElementById('jogadorAtualLabel').textContent = `Jogador atual: ${jogadores[jogadorAtualIndex]}`;
  document.getElementById('progresso')?.remove(); // opcional: remover barra de progresso antiga
  iniciarTimer();
  atualizarPlacar();
}

 
function iniciarTimer() {
  let tempo = 30;
  const total = 2 * Math.PI * 45;
  const arc = document.getElementById("timerArc");
  const text = document.getElementById("timerText");

  arc.style.strokeDasharray = total;
  arc.style.strokeDashoffset = 0;
  text.textContent = tempo;

  // Define cor inicial
  arc.classList.remove("timer-amarelo", "timer-vermelho");
  arc.classList.add("timer-verde");

  clearInterval(timer);
  timer = setInterval(() => {
    tempo--;
    text.textContent = tempo;
    arc.style.strokeDashoffset = total * ((30 - tempo) / 30);

    // Atualiza cor conforme o tempo
    arc.classList.remove("timer-verde", "timer-amarelo", "timer-vermelho");
    if (tempo > 20) {
      arc.classList.add("timer-verde");
    } else if (tempo > 10) {
      arc.classList.add("timer-amarelo");
    } else {
      arc.classList.add("timer-vermelho");
    }

    if (tempo <= 0) {
      clearInterval(timer);
      document.getElementById('feedback').textContent = '⏱️ Tempo esgotado!';
      setTimeout(proximaAtividade, 1000);
      responder('');
    }
  }, 1000);
}
  function responder(cor) {
  if (!podeResponder) return;
  podeResponder = false;
    clearInterval(timer);
    const jogadorIndex = jogadorAtualIndex;
    const correta = atividades[indice].cor;
    let pontos = 0;
    let erroGrave = (cor === 'verde' && correta === 'vermelho') || (cor === 'vermelho' && correta === 'verde');
    if (cor === correta) {
      pontos = (cor === 'verde') ? 3 : (cor === 'amarelo') ? 2 : 1;
      sequencias[jogadorIndex]++;
      document.getElementById('feedback').textContent = '✅ Correto!';
    setTimeout(proximaAtividade, 1000);
      if (sequencias[jogadorIndex] === 5) {
        pontos += 5;
        alert(`${jogadores[jogadorIndex]} ganhou bônus de +5 pontos por 5 acertos seguidos!`);
        sequencias[jogadorIndex] = 0;
      }
    } else {
      sequencias[jogadorIndex] = 0;
      pontos = erroGrave ? -3 : -2;
      if (cor === '') pontos = -1;
      document.getElementById('feedback').textContent = '❌ Errado!';
    setTimeout(proximaAtividade, 1000);
    }
    pontuacoes[jogadorIndex] += pontos;
    atualizarPlacar();
  }


  function proximaAtividade() {
    jogadorAtualIndex = (jogadorAtualIndex + 1) % jogadores.length;
    indice++;
   if (indice >= rodadasTotais || indice >= atividades.length) {
  clearInterval(timer);
  const max = Math.max(...pontuacoes);
  const vencedores = jogadores.filter((_, i) => pontuacoes[i] === max);
  document.getElementById('atividade').textContent = `🏁 Fim do jogo! Vencedor${vencedores.length > 1 ? 'es' : ''}: ${vencedores.join(", ")}`;
  document.getElementById('feedback').textContent = '';
  atualizarPlacar();
} else {
  mostrarAtividade();
}
  }
  function atualizarPlacar() {
  let placarHTML = '<h3>Placar</h3>';
  const max = Math.max(...pontuacoes);
  jogadores.forEach((j, i) => {
    const destaque = (indice >= atividades.length && pontuacoes[i] === max) ? 'vencedor' : '';
    placarHTML += `<p class="${destaque}">${j}: ${pontuacoes[i]} pontos</p>`;
  });
  document.getElementById('placar').innerHTML = placarHTML;
}
  function abrirManual() {
    document.getElementById("manualModal").style.display = "block";
  }
  function fecharManual() {
    document.getElementById("manualModal").style.display = "none";
  }