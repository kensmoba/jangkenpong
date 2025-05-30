import { Room } from 'colyseus';

export class GameRoom extends Room {
  onCreate(options) {
    this.maxClients = 2;
    this.setState({
      players: {},
      moves: {},
      result: null
    });

    this.onMessage('makeMove', (client, message) => {
      if (Object.keys(this.state.players).length === 2) {
        this.state.moves[client.sessionId] = message.choice;
        if (Object.keys(this.state.moves).length === 2) {
          this.resolveRound();
        }
      }
    });
  }

  onJoin(client, options) {
    const playerName = options.playerName || `Player_${client.sessionId.slice(0, 4)}`;
    this.state.players[client.sessionId] = {
      id: client.sessionId,
      name: playerName,
      score: 0
    };
    this.broadcast('state', this.state);
  }

  onLeave(client) {
    delete this.state.players[client.sessionId];
    delete this.state.moves[client.sessionId];
    this.state.result = null;
    this.broadcast('state', this.state);
  }

  resolveRound() {
    const [player1Id, player2Id] = Object.keys(this.state.moves);
    const move1 = this.state.moves[player1Id];
    const move2 = this.state.moves[player2Id];
    let result = '';

    if (move1 === move2) {
      result = 'Tie!';
    } else if (
      (move1 === 'rock' && move2 === 'scissors') ||
      (move1 === 'paper' && move2 === 'rock') ||
      (move1 === 'scissors' && move2 === 'paper')
    ) {
      this.state.players[player1Id].score += 1;
      result = `${this.state.players[player1Id].name} Wins!`;
    } else {
      this.state.players[player2Id].score += 1;
      result = `${this.state.players[player2Id].name} Wins!`;
    }

    this.state.result = result;
    this.state.moves = {};
    this.state.result = null; // Reset result for next round
    this.broadcast('state', this.state);
  }
}