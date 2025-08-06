import { renderMatchList, matches, addMatch} from "../data/matches.js";
import { getPlayer, addPlayer, players, renderPodium, savePlayerData} from '../data/players.js';

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
    <input type="text" required name="start-wiki" placeholder="Título da página" class="form-control start-wiki-field">
    <div>v</div>
    <input type="text" required name="goal-wiki" placeholder="Título da página" class="form-control goal-wiki-field">
  `

  // This bit generates a number field for each player registered in 'players'
  players.forEach(player => {
    html += `
      <div class="player-clicks-box py-1">
        <label>${player.name}: <input type="number" name="${player.id}-clicks" placeholder="00" class="form-control-sm player-clicks-field"></label>
      </div>
    `;
  });

  // Adding the submit and add player lines
  html += `
    <div class="d-flex">
      <div class="mb-3 input-group">
        <input type="text" class="form-control js-add-player-field" placeholder="Novo Jogador">
        <button class="btn btn-success js-add-player-button" type="button">+</button>
      </div>
    </div>
    <button type="submit" class="btn btn-primary my-2 w-100">Adicionar Partida</button>
  `;

  form.innerHTML += html;

  const addPlayerButton = document.querySelector('.js-add-player-button');
  
  addPlayerButton.addEventListener('click', () =>{
    const newPlayerName = document.querySelector('.js-add-player-field').value;

    if (newPlayerName) {
      addPlayer(newPlayerName);
      renderAddMatchForm();
    } else {
      alert('You have to inform the player\'s name')
    }
  })

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
      if (key.endsWith('-clicks') && value && parseInt(value) != 0) {
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