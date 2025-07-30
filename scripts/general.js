import { renderMatchList, matches, generateMatchId } from "../data/matches.js";
import { getPlayer, players, updateScore, savePlayerData, orderPlayers} from '../data/players.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let selectedPlayers = []; // Temporary variable to store the selected players

renderMatchList();
renderPodium();
renderParticipantSelection();
console.log(players); // DONKEY

function renderParticipantSelection() {
  const form = document.querySelector('.js-participant-selection');
  let html = '';

  players.forEach(player => {
    html += `
      <label><input type="checkbox" name="participant-option" value="${player.id}">${player.name}</label>
    `;
  });

  html += `<button type="submit">Próximo</button>`;

  form.innerHTML = html;

  form.addEventListener('submit', event => {
    const checkboxes = document.querySelectorAll('input[name="participant-option"]:checked');
    console.log(checkboxes); // CONTINUE
  })
}

function renderPodium() {
  const playerList = orderPlayers();

  for (let i = 1; i <= 3; i++) {
    document.querySelector(`.js-place-${i}`).innerHTML = playerList[i - 1].name;
    document.querySelector(`.js-place-${i}-points`).innerHTML = playerList[i - 1].score;
  }
}

function addMatch(start, goal, participantsArray) {
  const newMatch = {
    id: generateMatchId(),
    start: start,
    goal: goal,
    playerData: generatePlayerData(participantsArray), // TODO
    winners: decideWinners(), // TODO
    date: dayjs().format()
  }

  matches.push(newMatch);
}

function matchPoints(match) {
  const amountOfWinners = match.winners.length;
  const amountOfLosers = match.playerData.length - amountOfWinners;

  const points = amountOfLosers / amountOfWinners;
  return points;
}

function distributePoints() {
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