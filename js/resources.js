var Resources = {
	imagesToLoad: [
		'res/img/roads.png',
		'res/img/obstacles.png',
		'res/img/background_dawn.png',
		'res/img/skyline_dawn.png',
		'res/img/player.png',
		'res/img/coin.png',
		'res/img/title.png',
		'res/img/labels.png',
		'res/img/gameover.png',
		'res/font/font.png',
		'res/img/controls.png',
        'res/img/building01.png',
        'res/img/building02.png',
        'res/img/building03.png',
        'res/img/building04.png',
        'res/img/building05.png',
        'res/img/house01.png',
        'res/img/house02.png',
        'res/img/house03.png',
        'res/img/powerups.png',
        'res/img/characters.png',
        'res/img/shield.png',
        'res/img/magnet.png',
        'res/img/explosion.png'
	],
	soundsToLoad: [
		'res/sfx/Apoca.ogg',
		'res/sfx/Hurt.ogg',
		'res/sfx/ReadyGo.ogg',
		'res/sfx/Coin.ogg',
		'res/sfx/Powerup.ogg',
		'res/sfx/Explosion.ogg',
		'res/sfx/Click.ogg',
		'res/sfx/Start.ogg'
	],
	
	images: [],
	sounds: [],
	
	callback: null
};

Resources.loadAll = function(_callback) {
	this.callback = _callback;
	Resources.loadNextImage();
}

Resources.loadNextImage = function() {
	if(this.imagesToLoad.length == 0) {
		console.log("Images loaded!");
		this.loadNextSound();
		return;
	}
	var imagePath = this.imagesToLoad.pop();
	var image = new Image();
	image.src = imagePath;
	image.onload = function(e) {
		Resources.images[imagePath] = this;
		Resources.loadNextImage();
	}
}

Resources.loadNextSound = function() {
	if(this.soundsToLoad.length == 0) {
		console.log("Resources loaded!");
		this.callback();
		return;
	}
	var soundPath = this.soundsToLoad.pop();
	Resources.sounds[soundPath] = new Audio(soundPath);
	Resources.loadNextSound();
}