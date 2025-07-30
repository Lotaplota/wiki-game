import { renderMatchList, matches } from "../data/matches.js";
import { getPlayer, players, updateScore, savePlayerData } from '../data/players.js';

renderMatchList();
distributePoints();

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

console.log(getPlayer('02'));