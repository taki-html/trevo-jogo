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
  function iniciarJogo() {
    const num = parseInt(document.getElementById('numJogadores').value);
    if (num < 1 || num > 6) {
      alert("Número inválido de jogadores. Escolha entre 1 e 6."); return;
    }
    jogadores = [], pontuacoes = [], sequencias = [];
    for (let i = 0; i < num; i++) {
      jogadores.push(`Jogador ${i + 1}`); pontuacoes.push(0); sequencias.push(0);
    }
    const select = document.getElementById("jogadorAtual");
    select.innerHTML = "";
    jogadores.forEach((j, i) => {
      const opt = document.createElement("option");
      opt.value = i; opt.textContent = j; select.appendChild(opt);
    });
    document.getElementById("setup").style.display = "none";
    document.getElementById("jogo").style.display = "block";
    mostrarAtividade();
  }
  function mostrarAtividade() {
    document.getElementById('atividade').textContent = atividades[indice].texto;
    document.getElementById('feedback').textContent = '';
    iniciarTimer(); atualizarPlacar();
  }
  function iniciarTimer() {
    let tempo = 30;
    document.getElementById("timer").textContent = tempo;
    clearInterval(timer);
    timer = setInterval(() => {
      tempo--;
      document.getElementById("timer").textContent = tempo;
      if (tempo <= 0) {
        clearInterval(timer);
        document.getElementById('feedback').textContent = '⏱️ Tempo esgotado!';
        responder('');
      }
    }, 1000);
  }
  function responder(cor) {
    clearInterval(timer);
    const jogadorIndex = parseInt(document.getElementById("jogadorAtual").value);
    const correta = atividades[indice].cor;
    let pontos = 0;
    let erroGrave = (cor === 'verde' && correta === 'vermelho') || (cor === 'vermelho' && correta === 'verde');
    if (cor === correta) {
      pontos = (cor === 'verde') ? 3 : (cor === 'amarelo') ? 2 : 1;
      sequencias[jogadorIndex]++;
      document.getElementById('feedback').textContent = '✅ Correto!';
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
    }
    pontuacoes[jogadorIndex] += pontos;
    atualizarPlacar();
  }
  function proximaAtividade() {
    indice++;
    if (indice >= atividades.length) {
      document.getElementById('atividade').textContent = '🏁 Fim do jogo!';
      document.getElementById('feedback').textContent = '';
      clearInterval(timer);
    } else {
      mostrarAtividade();
    }
  }
  function atualizarPlacar() {
    let placarHTML = '<h3>Placar</h3>';
    jogadores.forEach((j, i) => {
      placarHTML += `<p>${j}: ${pontuacoes[i]} pontos</p>`;
    });
    document.getElementById('placar').innerHTML = placarHTML;
  }
  function abrirManual() {
    document.getElementById("manualModal").style.display = "block";
  }
  function fecharManual() {
    document.getElementById("manualModal").style.display = "none";
  }