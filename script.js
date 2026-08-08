(function(){
  const splash = document.getElementById('splash');
  const menu = document.getElementById('menu');
  const gameScreen = document.getElementById('game');

  function showScreen(el){
    [splash, menu, gameScreen].forEach(s => s.classList.remove('active'));
    el.classList.add('active');
  }

  // ---------- Splash timing ----------
  setTimeout(() => showScreen(menu), 2400);

  // ---------- Menu logic ----------
  let mode = 'pvp';      // 'pvp' | 'pvc'
  let difficulty = 'hard'; // 'easy' | 'hard'

  const pvpBtn = document.getElementById('pvpBtn');
  const pvcBtn = document.getElementById('pvcBtn');
  const diffRow = document.getElementById('diffRow');

  pvpBtn.addEventListener('click', () => {
    mode = 'pvp';
    diffRow.style.display = 'none';
    startGame();
  });

  pvcBtn.addEventListener('click', () => {
    mode = 'pvc';
    diffRow.style.display = 'flex';
  });

  diffRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.diff-btn');
    if(!btn) return;
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    difficulty = btn.dataset.diff;
    startGame();
  });

  document.getElementById('backBtn').addEventListener('click', () => {
    showScreen(menu);
  });

  // ---------- Game state ----------
  const boardEl = document.getElementById('board');
  const statusLine = document.getElementById('statusLine');
  const modeLabel = document.getElementById('modeLabel');
  const oLabel = document.getElementById('oLabel');
  const xScoreEl = document.getElementById('xScore');
  const oScoreEl = document.getElementById('oScore');
  const dScoreEl = document.getElementById('dScore');
  const xPill = document.getElementById('xPill');
  const oPill = document.getElementById('oPill');

  let cells = Array(9).fill(null);
  let current = 'X';
  let gameOver = false;
  let scores = { X: 0, O: 0, D: 0 };

  const WIN_LINES = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function startGame(){
    modeLabel.textContent = mode === 'pvp' ? 'PLAYER VS PLAYER' : ('VS COMPUTER · ' + difficulty.toUpperCase());
    oLabel.textContent = mode === 'pvp' ? 'PLAYER O' : 'COMPUTER';
    scores = { X: 0, O: 0, D: 0 };
    updateScoreDisplay();
    showScreen(gameScreen);
    resetRound();
  }

  function resetRound(){
    cells = Array(9).fill(null);
    current = 'X';
    gameOver = false;
    renderBoard();
    updateStatus();
    updateActivePill();
  }

  function renderBoard(){
    boardEl.innerHTML = '';
    cells.forEach((val, idx) => {
      const cell = document.createElement('div');
      cell.className = 'cell' + (val ? ' taken' : '');
      cell.dataset.idx = idx;
      if(val) cell.appendChild(markSVG(val, true));
      cell.addEventListener('click', () => handleCellClick(idx));
      boardEl.appendChild(cell);
    });
  }

  function markSVG(type, animate){
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    if(animate) svg.classList.add('pop-in');
    if(type === 'X'){
      svg.innerHTML = '<path class="mark-x" d="M20 20 L80 80 M80 20 L20 80"/>';
    } else {
      svg.innerHTML = '<circle class="mark-o" cx="50" cy="50" r="32"/>';
    }
    return svg;
  }

  function handleCellClick(idx){
    if(gameOver || cells[idx]) return;
    if(mode === 'pvc' && current === 'O') return; // block manual click on computer's turn

    placeMark(idx, current);

    const result = evaluateBoard(cells);
    if(result){
      finishRound(result);
      return;
    }

    current = current === 'X' ? 'O' : 'X';
    updateStatus();
    updateActivePill();

    if(mode === 'pvc' && current === 'O' && !gameOver){
      setTimeout(computerMove, 420);
    }
  }

  function placeMark(idx, player){
    cells[idx] = player;
    const cellEl = boardEl.children[idx];
    cellEl.classList.add('taken');
    cellEl.appendChild(markSVG(player, true));
  }

  function evaluateBoard(b){
    for(const line of WIN_LINES){
      const [a,b1,c] = line;
      if(b[a] && b[a] === b[b1] && b[a] === b[c]){
        return { winner: b[a], line };
      }
    }
    if(b.every(v => v)) return { winner: 'draw' };
    return null;
  }

  function finishRound({ winner, line }){
    gameOver = true;
    if(winner === 'draw'){
      scores.D++;
      statusLine.textContent = "It's a draw";
    } else {
      scores[winner]++;
      const who = (mode === 'pvc' && winner === 'O') ? 'Computer' : ('Player ' + winner);
      statusLine.textContent = who + ' wins!';
      line.forEach(i => boardEl.children[i].classList.add('win-cell'));
    }
    updateScoreDisplay();
    xPill.classList.remove('active-turn');
    oPill.classList.remove('active-turn');
  }

  function updateStatus(){
    if(gameOver) return;
    if(mode === 'pvc'){
      statusLine.textContent = current === 'X' ? "Your turn" : "Computer's turn";
    } else {
      statusLine.textContent = "Player " + current + "'s turn";
    }
  }

  function updateActivePill(){
    xPill.classList.toggle('active-turn', current === 'X' && !gameOver);
    oPill.classList.toggle('active-turn', current === 'O' && !gameOver);
  }

  function updateScoreDisplay(){
    xScoreEl.textContent = scores.X;
    oScoreEl.textContent = scores.O;
    dScoreEl.textContent = scores.D;
  }

  document.getElementById('newRoundBtn').addEventListener('click', resetRound);
  document.getElementById('resetScoreBtn').addEventListener('click', startGame);

  // ---------- Computer AI ----------
  function computerMove(){
    if(gameOver) return;
    let idx;
    if(difficulty === 'easy'){
      idx = easyMove();
    } else {
      idx = bestMove();
    }
    placeMark(idx, 'O');
    const result = evaluateBoard(cells);
    if(result){
      finishRound(result);
      return;
    }
    current = 'X';
    updateStatus();
    updateActivePill();
  }

  function easyMove(){
    // 65% random, 35% smart, so it's beatable but not silly
    const empties = cells.map((v,i) => v ? null : i).filter(v => v !== null);
    if(Math.random() < 0.65){
      return empties[Math.floor(Math.random() * empties.length)];
    }
    return bestMove();
  }

  function bestMove(){
    // Minimax — unbeatable
    let bestScore = -Infinity;
    let move = null;
    for(let i = 0; i < 9; i++){
      if(!cells[i]){
        cells[i] = 'O';
        const score = minimax(cells, 0, false);
        cells[i] = null;
        if(score > bestScore){
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  function minimax(board, depth, isMaximizing){
    const result = evaluateBoard(board);
    if(result){
      if(result.winner === 'O') return 10 - depth;
      if(result.winner === 'X') return depth - 10;
      return 0;
    }

    if(isMaximizing){
      let best = -Infinity;
      for(let i = 0; i < 9; i++){
        if(!board[i]){
          board[i] = 'O';
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i] = null;
        }
      }
      return best;
    } else {
      let best = Infinity;
      for(let i = 0; i < 9; i++){
        if(!board[i]){
          board[i] = 'X';
          best = Math.min(best, minimax(board, depth + 1, true));
          board[i] = null;
        }
      }
      return best;
    }
  }

})();