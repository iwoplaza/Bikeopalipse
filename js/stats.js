var Stats = {
	highScore: 0,
	coins: 0,
	obtainedCharacters: [],
	
	music: true, sfx: true,
	
	resetGame: function() {
		this.coins = 0;
		this.highScore = 0;
		this.obtainedCharacters = [];
		localStorage.setItem('highscore', this.highScore);
		localStorage.setItem('coins', this.coins);
		localStorage.setItem('obtainedCharacters', this.obtainedCharacters);
	},
	
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
	},
	
	obtainCharacter: function(_character) {
		this.obtainedCharacters[_character] = true;
		localStorage.setItem('obtainedCharacters', this.obtainedCharacters);
	},
	
	hasObtainedCharacter: function(_character) {
		return this.obtainedCharacters[_character] == true;
	}
};