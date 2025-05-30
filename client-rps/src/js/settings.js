import gsap from 'gsap';

export function initSettings() {
  const settingsScreen = document.getElementById('settings-screen');
  const menuScreen = document.getElementById('menu-screen');
  const musicToggle = document.getElementById('music-toggle');
  const volumeSlider = document.getElementById('volume-slider');
  const soundToggle = document.getElementById('sound-toggle');
  const soundVolumeSlider = document.getElementById('sound-volume-slider');
  const saveBtn = document.getElementById('save-settings-btn');
  const backBtn = document.getElementById('back-to-menu-settings-btn');
  const backgroundMusic = document.getElementById('background-music');

  const isMusicEnabled = localStorage.getItem('musicEnabled') !== 'false';
  const savedMusicVolume = localStorage.getItem('musicVolume') || '50';
  const isSoundEnabled = localStorage.getItem('soundEnabled') !== 'false';
  const savedSoundVolume = localStorage.getItem('soundVolume') || '50';

  musicToggle.checked = isMusicEnabled;
  volumeSlider.value = savedMusicVolume;
  soundToggle.checked = isSoundEnabled;
  soundVolumeSlider.value = savedSoundVolume;
  backgroundMusic.volume = savedMusicVolume / 100;

  if (isMusicEnabled) {
    backgroundMusic.play().catch(e => console.error('Error playing music:', e));
  } else {
    backgroundMusic.pause();
  }

  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value / 100;
    backgroundMusic.volume = volume;
  });

  soundVolumeSlider.addEventListener('input', () => {
    // Sound volume is stored but applied in game.js
  });

  saveBtn.addEventListener('click', () => {
    localStorage.setItem('musicEnabled', musicToggle.checked);
    localStorage.setItem('musicVolume', volumeSlider.value);
    localStorage.setItem('soundEnabled', soundToggle.checked);
    localStorage.setItem('soundVolume', soundVolumeSlider.value);
    if (musicToggle.checked) {
      backgroundMusic.play().catch(e => console.error('Error playing music:', e));
    } else {
      backgroundMusic.pause();
    }
    alert('Settings saved!');
  });

  backBtn.addEventListener('click', () => {
    settingsScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
    gsap.from(menuScreen, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
}