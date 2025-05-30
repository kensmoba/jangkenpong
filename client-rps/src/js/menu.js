import gsap from 'gsap';

export function initMenu() {
  const menuScreen = document.getElementById('menu-screen');
  const roomScreen = document.getElementById('room-screen');
  const settingsScreen = document.getElementById('settings-screen');
  const playBtn = document.getElementById('play-btn');
  const settingsBtn = document.getElementById('settings-btn');
  const exitBtn = document.getElementById('exit-btn');

  function showScreen(screen) {
    document.querySelectorAll('#menu-screen, #room-screen, #settings-screen, #game-screen').forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
    gsap.from(screen, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  playBtn.addEventListener('click', () => showScreen(roomScreen));
  settingsBtn.addEventListener('click', () => showScreen(settingsScreen));
  exitBtn.addEventListener('click', () => alert('Thanks for playing!'));
}