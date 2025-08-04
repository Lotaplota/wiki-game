import { players, updateScore } from "../data/players.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let matches = JSON.parse(localStorage.getItem('matches')) || [
{
  id: 'YYMMDDa#',
  start: 'Start Page',
  goal: 'Goal Page',
  playerData: [{
    playerId: '01',
    clicks: 99
  }, {
    playerId: '02',
    clicks: 1
  }, {
    playerId: '03',
    clicks: 99
  }],
  winners: ['02'],
  date: '2024-08-25T21:57:00Z'
}]

// Returns the match that matches the id given
export function getMatch(matchId) {
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].id === matchId) {
      return matches[i];
    }
  }
}

export function addMatch(start, goal, participantsArray) {
  const newMatch = {
    id: generateMatchId(),
    start: start,
    goal: goal,
    playerData: participantsArray,
    winners: decideWinners(participantsArray),
    date: dayjs().format()
  }

  matches.push(newMatch);
  updateScore();
  saveMatches();
}

export function saveMatches() {
  localStorage.setItem('matches', JSON.stringify(matches));
}

export function decideWinners(participantsData) {
  // Finding the smallest amount of clicks
  let matchClicks = participantsData.map(participant => participant.clicks);
  let minimumClicks = Math.min(...matchClicks);

  let winners = [];

  // Pushing the participants that clicked the less
  participantsData.forEach(participant => {
    if (participant.clicks === minimumClicks) {
      winners.push(participant.playerId)
    }
  });

  return winners;
}

export function generateMatchId () {
  const table = '0123456789abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < 8; i++) {
    result += table.charAt(Math.floor(Math.random() * table.length));
  }

  return result;
}

export function renderMatchList() {
  const matchListHTML = document.querySelector(".js-match-list-items");
  let newHTML = '';
  
  matches.forEach(match => {
    // Each participant in the match will have it's own <div> with their scores from each game
    let playerDataHTML = '';
    
    match.playerData.forEach((participant) => {
      let matchingPlayer;

      // Loop through the player list to find the matching player
      players.forEach(player => {
        if (participant.playerId === player.id) {
          matchingPlayer = player;
        }
      })

      playerDataHTML += `
        <div class="player-score">
          ${matchingPlayer.name}: ${participant.clicks}
        </div>
      `
    })

    newHTML +=
    `
      <tr>
        <td>${match.start} → ${match.goal}</td>
        <td>${playerDataHTML}</td>
        <td>${match.date}</td>
      </tr>
    `;
  });
  
  matchListHTML.innerHTML = newHTML;
}

export function matchPoints(match) {
  const amountOfWinners = match.winners.length;
  const amountOfLosers = match.playerData.length - amountOfWinners;

  const points = amountOfLosers / amountOfWinners;
  return points;
}