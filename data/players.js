import { matches } from './matches.js';

export const players = [
  {
    id: '01',
    name: 'lucas',
    score: 0
  }, {
    id: '02',
    name: 'territo',
    score: 0
  }, {
    id: '03',
    name: 'jéssika',
    score: 0
  }
]

// Implement this when you add the event button
export function updateScore() {
  players.forEach(player => {
    
  })
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