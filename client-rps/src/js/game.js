import gsap from 'gsap';

export function initGame(client, room) {
  const gameScreen = document.getElementById('game-screen');
  const menuScreen = document.getElementById('menu-screen');
  const playerScoreEl = document.getElementById('player-score');
  const opponentScoreEl = document.getElementById('opponent-score');
  const resultEl = document.getElementById('game-result');
  const rockBtn = document.getElementById('rock-btn');
  const paperBtn = document.getElementById('paper-btn');
  const scissorsBtn = document.getElementById('scissors-btn');
  const leaveRoomBtn = document.getElementById('leave-room-btn');
  const roomIdInput = document.getElementById('room-id');

  const buttonClickSound = document.getElementById('button-click-sound');
  const winSound = document.getElementById('win-sound');
  const lossSound = document.getElementById('loss-sound');
  const tieSound = document.getElementById('tie-sound');

  let playerScore = 0;
  let opponentScore = 0;
  let lastPlayerScore = 0;
  let lastOpponentScore = 0;
  let playerName = '';
  let opponentName = '';
  let selectedCard = null;

  const isSoundEnabled = () => localStorage.getItem('soundEnabled') !== 'false';
  const getSoundVolume = () => (localStorage.getItem('soundVolume') || '50') / 100;

  const playSound = (audioElement) => {
    if (isSoundEnabled()) {
      audioElement.volume = getSoundVolume();
      audioElement.currentTime = 0;
      audioElement.play().catch(e => console.error('Error playing sound:', e));
    }
  };

  function enableButtons() {
    [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('opacity-50', 'cursor-not-allowed');
    });
  }

  function disableButtons() {
    [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
      btn.disabled = true;
      btn.classList.add('opacity-50', 'cursor-not-allowed');
    });
  }

  function updateScores(state) {
    const player = state.players[room.sessionId];
    const opponent = Object.values(state.players).find(p => p.id !== room.sessionId);
    
    playerScore = player?.score || 0;
    playerName = player?.name || 'You';
    opponentScore = opponent?.score || 0;
    opponentName = opponent?.name || 'Opponent';

    gsap.to(playerScoreEl, {
      textContent: `${playerName}: ${playerScore}`,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: function () {
        playerScoreEl.textContent = `${playerName}: ${Math.round(parseFloat(this.targets()[0].textContent.split(': ')[1]) || 0)}`;
      }
    });
    gsap.to(opponentScoreEl, {
      textContent: `${opponentName}: ${opponentScore}`,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: function () {
        opponentScoreEl.textContent = `${opponentName}: ${Math.round(parseFloat(this.targets()[0].textContent.split(': ')[1]) || 0)}`;
      }
    });
  }

  function showResult(result) {
    console.log('Result:', result);
    resultEl.textContent = result;
    gsap.fromTo(
      resultEl,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
    );

    if (playerScore > lastPlayerScore) {
      playSound(winSound);
    } else if (opponentScore > lastOpponentScore) {
      playSound(lossSound);
    } else if (result === 'Tie!') {
      playSound(tieSound);
    }

    lastPlayerScore = playerScore;
    lastOpponentScore = opponentScore;

    setTimeout(() => {
      enableButtons();
      resultEl.textContent = '';
      if (selectedCard) {
        selectedCard.classList.remove('selected');
        selectedCard = null;
      }
    }, 2000);
  }

  [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
    btn.replaceWith(btn.cloneNode(true));
  });

  const newRockBtn = document.getElementById('rock-btn');
  const newPaperBtn = document.getElementById('paper-btn');
  const newScissorsBtn = document.getElementById('scissors-btn');

  [newRockBtn, newPaperBtn, newScissorsBtn].forEach(btn => {
    const card = btn.closest('.option-card');
    btn.addEventListener('click', () => {
      if (!btn.disabled) {
        playSound(buttonClickSound);
        const choice = btn.id.split('-')[0];

        if (selectedCard && selectedCard !== card) {
          selectedCard.classList.remove('selected');
        }
        card.classList.add('selected');
        selectedCard = card;

        room.send('makeMove', { choice });
        disableButtons();

        gsap.to(card, {
          scale: 1.15,
          duration: 0.2,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 1
        });
      }
    });
  });

  leaveRoomBtn.addEventListener('click', () => {
    playSound(buttonClickSound);
    room.leave();
    window.currentRoom = null;
    gameScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
    gsap.from(menuScreen, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out'
    });
    playerScore = 0;
    opponentScore = 0;
    lastPlayerScore = 0;
    lastOpponentScore = 0;
    playerScoreEl.textContent = 'Player: 0';
    opponentScoreEl.textContent = 'Opponent: 0';
    resultEl.textContent = '';
    roomIdInput.value = '';
    enableButtons();
    if (selectedCard) {
      selectedCard.classList.remove('selected');
      selectedCard = null;
    }
  });

  room.onStateChange(state => {
    updateScores(state);
    if (state.result) {
      showResult(state.result);
    }
  });

  room.onMessage('state', (state) => {
    updateScores(state);
    if (state.result) {
      showResult(state.result);
    } else {
      enableButtons();
      resultEl.textContent = '';
      if (selectedCard) {
        selectedCard.classList.remove('selected');
        selectedCard = null;
      }
    }
  });

  room.onLeave((code) => {
    console.log('Left room with code:', code);
    gameScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
    gsap.from(menuScreen, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out'
    });
    playerScore = 0;
    opponentScore = 0;
    lastPlayerScore = 0;
    lastOpponentScore = 0;
    playerScoreEl.textContent = 'Player: 0';
    opponentScoreEl.textContent = 'Opponent: 0';
    resultEl.textContent = '';
    roomIdInput.value = '';
    enableButtons();
    // Reset selection
    if (selectedCard) {
      selectedCard.classList.remove('selected');
      selectedCard = null;
    }
  });
}