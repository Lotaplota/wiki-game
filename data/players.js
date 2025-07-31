import { matches, matchPoints} from './matches.js';

export const players = JSON.parse(localStorage.getItem('players')) || [
  {
    id: '01',
    name: 'Lucas',
    score: 0
  }, {
    id: '02',
    name: 'Territo',
    score: 0
  }, {
    id: '03',
    name: 'Jéssika',
    score: 0
  }
]

export function orderPlayers() {
  const decreasingPlayers = [...players].sort((a, b) => b.score - a.score); // This ... thing is a bit tricky...
  return decreasingPlayers;
}

export function getPlayer(id) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === id) {
      return players[i];
    }
  }
  
  return null;
}

export function savePlayerData() {
  localStorage.setItem('players', JSON.stringify(players));
}

export function updateScore() {
  // Resetting players' scores
  players.forEach(player => {
    player.score = 0;
  })

  // For each match, loop through each winner and distribute their scores
  matches.forEach(match => {
    match.winners.forEach(winnerId => {
      getPlayer(winnerId).score += matchPoints(match);
    });
  });

  savePlayerData();
}