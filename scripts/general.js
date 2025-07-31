import { renderMatchList, matches, generateMatchId } from "../data/matches.js";
import { getPlayer, players, updateScore, savePlayerData, orderPlayers} from '../data/players.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let selectedPlayers = []; // Temporary variable to store the selected players

renderMatchList();
renderPodium();
renderAddMatchForm();

// Renders the form to add a new match
function renderAddMatchForm() {
  const form = document.querySelector('.js-participant-selection');
  let html = '';

  // This bit generates a number field for each player registered in 'players' 
  players.forEach(player => {
    html += `
      <div class="py-1">
        <label>${player.name}: <input type="number" name="${player.id}-clicks" placeholder="00" class="player-clicks-field"></label>
      </div>
    `;
  });

  // This is just the submit button
  html += `<button type="submit">Próximo</button>`;

  form.innerHTML += html;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Variables that will be passed to the addMatch() function
    const startWiki = formData.get('start-wiki');
    const goalWiki = formData.get('goal-wiki');
    const participantsData = [];
    
    // This generates an array of objects on the format the playerData is stored in each match
    // It should work just fine when passed into addMatch()
    for (const [key, value] of formData.entries()) {
      if (key.endsWith('-clicks') && value) {
        const playerId = key.replace('-clicks', '');
        const clicks = parseInt(value, 10)

        participantsData.push({
          playerId,
          clicks
        });
      }
    }

    // TODO uncomment the bit below after decideWinners() is implemented
    // addMatch(startWiki, goalWiki, participantsData);
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
    playerData: participantsArray,
    winners: decideWinners(participantsArray), // TODO
    date: dayjs().format()
  }

  matches.push(newMatch);
}

function decidewinners() {
  // TODO
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