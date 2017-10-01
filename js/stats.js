var Stats = {
	highScore: 0,
	coins: 0,
	obtainedCharacters: {
		'vance': true
	},
	currentCharacter: "vance",
	
	music: true, sfx: true,
	
	resetGame: function() {
		this.coins = 0;
		this.highScore = 0;
		this.obtainedCharacters = {'vance': true};
		this.currentCharacter = CharacterVance.prototype.name;
		localStorage.setItem('highscore', this.highScore);
		localStorage.setItem('coins', this.coins);
		localStorage.setItem('obtainedCharacters', JSON.stringify(this.obtainedCharacters));
		localStorage.setItem('currentCharacter', this.currentCharacter);
	},
	
	fetch: function() {
		if(localStorage.getItem('highscore'))
			this.highScore = parseInt(localStorage.getItem('highscore'));
		if(localStorage.getItem('coins'))
			this.coins = parseInt(localStorage.getItem('coins'));
		if(localStorage.getItem('obtainedCharacters'))
			this.obtainedCharacters = JSON.parse(localStorage.getItem('obtainedCharacters'));
		if(localStorage.getItem('currentCharacter'))
			this.currentCharacter = localStorage.getItem('currentCharacter');
		
		if(localStorage.getItem('music'))
			this.music = localStorage.getItem('music') == "true";
		if(localStorage.getItem('sfx'))
			this.sfx = localStorage.getItem('sfx') == "true";
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
	
	consumeCoins: function(a) {
		if(this.coins >= a) {
			this.coins -= a;
			this.updateCoins();
			return true;
		}else return false;
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
		localStorage.setItem('obtainedCharacters', JSON.stringify(this.obtainedCharacters));
	},
	
	hasObtainedCharacter: function(_character) {
		return this.obtainedCharacters[_character] == true;
	}
};