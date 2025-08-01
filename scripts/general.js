import { renderMatchList, matches, generateMatchId, decideWinners, saveMatches, addMatch } from "../data/matches.js";
import { getPlayer, addPlayer, players, updateScore, savePlayerData, orderPlayers} from '../data/players.js';

let selectedPlayers = []; // Temporary variable to store the selected players

renderMatchList();
renderPodium();
renderAddMatchForm();

// Renders the form to add a new match
function renderAddMatchForm() {
  const form = document.querySelector('.js-participant-selection');

  // Emptying the form content to avoid duplicate information if this function gets called again
  form.innerHTML = '';
  let html = '';

  html += `
    <label>Wiki inicial: <input type="text" required name="start-wiki" placeholder="Título da página" class="start-wiki-field"></label><br>
      <label>Wiki final: <input type="text" required name="goal-wiki" placeholder="Título da página" class="goal-wiki-field"></label>
  `

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

    addMatch(startWiki, goalWiki, participantsData);
    renderMatchList();
    renderPodium();
  })
}

function renderPodium() {
  const playerList = orderPlayers();

  for (let i = 1; i <= 3; i++) {
    document.querySelector(`.js-place-${i}`).innerHTML = playerList[i - 1].name;
    document.querySelector(`.js-place-${i}-points`).innerHTML = playerList[i - 1].score;
  }
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