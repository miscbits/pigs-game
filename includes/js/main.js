var turn = true, score1 = 0, score2 = 0, atRisk = 0, risksTaken = 0, gameOver=false, roll = 0;


$(document).ready(function() {	
	setMessages();
	$("#dicebutton").click(function(event) {
		if (!gameOver) {	
			rollDice();
		};
	});
	$("#no").click(function(event) {
		if (!gameOver) {	
			endTurn();
		};
	});
});

function rollDice() {
	setTimeout(function() {
		roll = parseInt($("#dice1").attr("src").charAt("41"));
		console.log(roll);
		if (roll != NaN) {	
			risksTaken++;
			if (roll != 1) {
				atRisk+=roll;
				setMessages();
				if (risksTaken==3)
					endTurn();
			}
			else{
				atRisk=0;
				endTurn();
			}	
		}
		else {
			rollDice();
		}
  	}, 1200);
}

function endTurn() {
	if (turn) 
		score1+=atRisk;
	else
		score2+=atRisk;
	turn = !turn;
	atRisk = 0;
	risksTaken=0;
	setMessages();
	if (score1>=50 || score2 >= 50){
		gameOver = true;
		endGame();
	}
}

function setMessages() {
	var player1 = $("#player-1");
	var player2 = $("#player-2");
	var curTurn = $("#turn");
	var risk = $("#risk");

	if(turn)
		curTurn.text('Player 1\'s Turn')
	else
		curTurn.text('Player 2\'s Turn')

	player1.text(score1)
	player2.text(score2)
	risk.text(atRisk)
}

function endGame() {
	var curTurn = $("#turn");
	var risk = $("#risk");

	if (score1>=50) {
		curTurn.text('!Player 1 Wins!')
	}
	else {
		curTurn.text('!Player 2 Wins!')
	}
	$("#curAtRisk").remove();
	risk.text('Congratulations!')
}

