import http from 'http';
import express from 'express';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import { GameRoom } from './rooms/GameRoom.js';

const app = express();
const server = http.createServer(app);

app.use('/colyseus', monitor());

const gameServer = new Server({ server });

gameServer.define('rps', GameRoom);

gameServer.listen(2567);
console.log('Colyseus server running on ws://localhost:2567');
console.log('Monitor dashboard available at http://localhost:2567/colyseus');