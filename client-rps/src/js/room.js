import gsap from 'gsap';

export function initRoom(client, initGameCallback) {
  const roomScreen = document.getElementById('room-screen');
  const menuScreen = document.getElementById('menu-screen');
  const gameScreen = document.getElementById('game-screen');
  const roomIdInput = document.getElementById('room-id');
  const joinRoomBtn = document.getElementById('join-room-btn');
  const createRoomBtn = document.getElementById('create-room-btn');
  const backBtn = document.getElementById('back-to-menu-btn');

  joinRoomBtn.addEventListener('click', async () => {
    try {
      const room = await client.joinById(roomIdInput.value, { game: 'rps' });
      roomScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      gsap.from(gameScreen, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: 'power2.out'
      });
      window.currentRoom = room;
      initGameCallback(client, room);
    } catch (e) {
      alert('Failed to join room: ' + e.message);
    }
  });

  createRoomBtn.addEventListener('click', async () => {
    try {
      const room = await client.create('rps');
      roomIdInput.value = room.id;
      roomScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      gsap.from(gameScreen, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: 'power2.out'
      });
      window.currentRoom = room;
      initGameCallback(client, room);
    } catch (e) {
      alert('Failed to create room: ' + e.message);
    }
  });

  backBtn.addEventListener('click', () => {
    roomScreen.classList.add('hidden');
    menuScreen.classList.remove('hidden');
    gsap.from(menuScreen, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
}