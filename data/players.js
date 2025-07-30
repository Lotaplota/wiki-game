import { matches } from './matches.js';

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

// Implement this when you add the event button
export function updateScore() {
  players.forEach(player => {
    
  })
}

export function orderPlayers() {
  const decreasingPlayers = players.sort((a, b) => b.score - a.score);
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