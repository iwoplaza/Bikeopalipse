var Stats = {
	highScore: 0,
	coins: 0,
	
	fetch: function() {
		if(localStorage.getItem('highscore'))
			this.highScore = localStorage.getItem('highscore');
		if(localStorage.getItem('coins'))
			this.highScore = localStorage.getItem('coins');
	},
	
	setHighscore: function(_score) {
		if(_score > this.highScore) {
			this.highScore = _score;
			localStorage.setItem('highscore', this.highScore);
		}
	},
	
	updateCoins: function() {
		localStorage.setItem('coins', this.coins);
	}
};