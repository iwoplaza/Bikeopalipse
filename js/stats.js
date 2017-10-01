var Stats = {
	highScore: 0,
	coins: 0,
	obtainedCharacters: [],
	currentCharacter: "vance spark",
	
	music: true, sfx: true,
	
	resetGame: function() {
		this.coins = 0;
		this.highScore = 0;
		this.obtainedCharacters = [];
		this.currentCharacter = CharacterVance.prototype.name;
		localStorage.setItem('highscore', this.highScore);
		localStorage.setItem('coins', this.coins);
		localStorage.setItem('obtainedCharacters', this.obtainedCharacters);
		localStorage.setItem('currentCharacter', this.currentCharacter);
	},
	
	fetch: function() {
		if(localStorage.getItem('highscore'))
			this.highScore = parseInt(localStorage.getItem('highscore'));
		if(localStorage.getItem('coins'))
			this.coins = parseInt(localStorage.getItem('coins'));
		if(localStorage.getItem('obtainedCharacters'))
			this.obtainedCharacters = localStorage.getItem('obtainedCharacters');
		if(localStorage.getItem('currentCharacter'))
			this.currentCharacter = localStorage.getItem('currentCharacter');
		
		if(localStorage.getItem('music'))
			this.music = localStorage.getItem('music');
		if(localStorage.getItem('sfx'))
			this.sfx = localStorage.getItem('sfx');
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