let players = [];
let scores = [];
let roundCounter = 1;

// Step 1: Submit number of players and show name input fields
document.getElementById('submitPlayers').addEventListener('click', function() {
  const numPlayers = document.getElementById('numPlayers').value;
  
  if (numPlayers > 0 && numPlayers <= 6) {
    document.getElementById('player-setup').style.display = 'none';
    document.getElementById('name-setup').style.display = 'block';

    const nameInputs = document.getElementById('nameInputs');
    nameInputs.innerHTML = ''; // clear old inputs

    for (let i = 0; i < numPlayers; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Player ${i + 1} Name`;
      input.id = `player${i}`;
      nameInputs.appendChild(input);
    }
  } else {
    alert('Please enter a valid number of players (1-6).');
  }
});

// Step 2: Start the game and initialize scores
document.getElementById('startGame').addEventListener('click', function() {
  const numPlayers = document.getElementById('numPlayers').value;

  for (let i = 0; i < numPlayers; i++) {
    const playerName = document.getElementById(`player${i}`).value;
    if (playerName) {
      players.push(playerName);
      scores.push(0);
    } else {
      alert('Please enter all player names.');
      return;
    }
  }

  document.getElementById('name-setup').style.display = 'none';
  document.getElementById('game-area').style.display = 'block';

  updateLeaderboard();
  createScoreInputs();
  updateRoundCounter();  // Update the initial round
});

// Step 3: Submit round scores
document.getElementById('nextRound').addEventListener('click', function() {
  const numPlayers = players.length;
  
  // Add round scores to each player
  for (let i = 0; i < numPlayers; i++) {
    const roundScore = parseInt(document.getElementById(`score${i}`).value);
    if (!isNaN(roundScore)) {
      scores[i] += roundScore;
    }
  }

  // Eliminate players who have reached or exceeded 102 points
  let eliminatedPlayers = [];
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 102) {
      eliminatedPlayers.push(i);
    }
  }

  if (eliminatedPlayers.length > 0) {
    // Remove eliminated players and show elimination modal
    eliminatedPlayers.reverse().forEach(i => {
      showEliminationModal(players[i]); // Show elimination popup
      players[i] += " (Eliminated)";
      players.splice(i, 1);
      scores.splice(i, 1);
    });
  }

  if (players.length === 1) {
    showWinnerModal(players[0]);  // Show winner modal
    resetGame();
  } else {
    updateLeaderboard();
    createScoreInputs();
    incrementRoundCounter();  // Increment the round after each submission
  }
});

// Helper function to update the round counter display
function updateRoundCounter() {
  document.getElementById('roundCounter').textContent = roundCounter;
}

// Helper function to increment the round counter
function incrementRoundCounter() {
  roundCounter += 1;
  updateRoundCounter();
}

// Helper function to update the leaderboard
function updateLeaderboard() {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '';
  
  for (let i = 0; i < players.length; i++) {
    const li = document.createElement('li');
    li.textContent = `${players[i]}: ${scores[i]} points`;
    leaderboard.appendChild(li);
  }
}

// Helper function to create score input fields
function createScoreInputs() {
  const scoreInputs = document.getElementById('scoreInputs');
  scoreInputs.innerHTML = '';

  for (let i = 0; i < players.length; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = `Score for ${players[i]}`;
    input.id = `score${i}`;
    scoreInputs.appendChild(input);
  }
}

// Helper function to show the elimination modal
function showEliminationModal(eliminatedPlayer) {
  const modal = document.getElementById('winnerModal');
  const message = document.getElementById('winnerMessage');
  message.textContent = `${eliminatedPlayer} has been eliminated!`;
  modal.style.display = 'block';

  // Close modal functionality
  const closeModal = document.getElementById('closeModal');
  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  // Close the modal if the user clicks anywhere outside of the modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

// Helper function to show the winner modal
function showWinnerModal(winner) {
  const modal = document.getElementById('winnerModal');
  const message = document.getElementById('winnerMessage');
  message.textContent = `${winner} is the winner! Congratulations!`;
  modal.style.display = 'block';

  // Close modal functionality
  const closeModal = document.getElementById('closeModal');
  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  // Close the modal if the user clicks anywhere outside of the modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

// Reset the game after a winner is declared
function resetGame() {
  players = [];
  scores = [];
  roundCounter = 1;  // Reset the round counter
  document.getElementById('player-setup').style.display = 'block';
  document.getElementById('name-setup').style.display = 'none';
  document.getElementById('game-area').style.display = 'none';
  document.getElementById('leaderboard').innerHTML = '';
  document.getElementById('scoreInputs').innerHTML = '';
  updateRoundCounter();  // Reset the round counter display
}
