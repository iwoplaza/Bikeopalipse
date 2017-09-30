var Stats = {
	highScore: 0,
	coins: 0,
	
	music: true, sfx: true,
	
	fetch: function() {
		if(localStorage.getItem('highscore'))
			this.highScore = parseInt(localStorage.getItem('highscore'));
		if(localStorage.getItem('coins'))
			this.coins = parseInt(localStorage.getItem('coins'));
	},
	
	setHighscore: function(_score) {
		if(_score > this.highScore) {
			this.highScore = _score;
			localStorage.setItem('highscore', this.highScore);
		}
	},
	
	updateCoins: function() {
		localStorage.setItem('coins', this.coins);
	},
	
	setMusic: function(_flag) {
		this.music = _flag;
		localStorage.setItem('music', this.music);
	},
	
	setSFX: function(_flag) {
		this.sfx = _flag;
		localStorage.setItem('sfx', this.sfx);
	}
};