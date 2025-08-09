import { players, updateScore, renderPodium } from "../data/players.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { toFixedIfNecessary } from "../scripts/utils/tools.js";

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
  
  // Looping through the matches array in reverse order
  for (let i = matches.length - 1; i >= 0; i--) {
    // Each participant in the match will have it's own <div> with their scores from each game
    let playerDataHTML = '';
    
    matches[i].playerData.forEach((participant) => {
      let matchingPlayer;

      // Loop through the player list to find the matching player
      players.forEach(player => {
        if (participant.playerId === player.id) {
          matchingPlayer = player;
        }
      })

      let isWinner = matches[i].winners.includes(matchingPlayer.id)
      ? 'winner'
      : ''
      ;

      let givenPoints = isWinner === 'winner' // Maybe change this later to be more elegant
      ? `<span class="points-popup">+${toFixedIfNecessary(matchPoints(matches[i]), 2)}</span>` // TODO get the match points
      : ''
      ;

      playerDataHTML += `
        <div class="player-score ${isWinner}">
          ${matchingPlayer.name}: ${participant.clicks}
          ${givenPoints}
        </div>
      `
    })

    newHTML +=
    `
      <tr>
        <td>
          <div class="position-relative">
            <button class="btn btn-sm btn-danger delete-match-button js-delete-match-button" data-match-id="${matches[i].id}" title="Apagar partida">
              <i class="bi bi-trash"></i>
            </button>
            ${matches[i].start} → ${matches[i].goal}
          </div>
        </td>
        <td>${playerDataHTML}</td>
        <td>${dayjs(matches[i].date).format('DD/MM/YYYY')}</td>
      </tr>
    `;
  };
  
  matchListHTML.innerHTML = newHTML;

  // Adding event listeners for the delete button
  const deleteMatchButtons = document.querySelectorAll('.js-delete-match-button');
  deleteMatchButtons.forEach((button) => {
    const matchId = button.dataset.matchId;

    button.addEventListener('click', () => {
      deleteMatch(matchId);
      renderMatchList();
      renderPodium();
    })
  })
}

export function matchPoints(match) {
  const amountOfWinners = match.winners.length;
  const amountOfLosers = match.playerData.length - amountOfWinners;

  const points = amountOfLosers / amountOfWinners;
  return points;
}

export function deleteMatch(matchId) {
  const match = getMatch(matchId);
  let matchIndex;

  if (match) {
    for (let i = 0; i < matches.length; i++) {
      if (match.id === matches[i].id) {
        matchIndex = i;
        break;
      }
    }
  } else {
    console.log(`There is no match with the id "${matchId}"`);
  }

  // Deletes the item in the 'matches' saves the new array, and renders the match list, if the index is valid
  if (matchIndex) {
    matches.splice(matchIndex, 1);
    saveMatches();
    updateScore();
    renderMatchList();
    renderPodium();
  }
}