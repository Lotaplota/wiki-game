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

// This order the players in decreasing order by their points, used mainly to render the podium
export function orderPlayersByPoints() {
  const decreasingPlayers = [...players].sort((a, b) => b.score - a.score); // This ... thing is a bit tricky...
  return decreasingPlayers;
}

// Returns a player by their id
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

// Looks at all the matches and distributes the points made in each match
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

// Adds a player with 0 score and 
export function addPlayer(playerName) {
  // Forces the id to be two digits long
  const playerId = String((players.length + 1)).padStart(2, '0');

  players.push({
    id: playerId,
    name: playerName,
    score: 0
  });

  savePlayerData();
}