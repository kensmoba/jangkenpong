import { Client } from 'colyseus.js';
import { initMenu } from './menu.js';
import { initSettings } from './settings.js';
import { initRoom } from './room.js';
import { initGame } from './game.js';

const client = new Client('wss://server-rps-game-production.up.railway.app');

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initSettings();
  initRoom(client, initGame);
});