var Resources = {
	imagesToLoad: [
		'res/img/roads.png',
		'res/img/obstacles.png',
		'res/img/background_dawn.png',
		'res/img/skyline_dawn.png',
		'res/img/player.png',
		'res/img/coin.png',
		'res/font/font.png'
	],
	soundsToLoad: [
		'res/sfx/Apoca.ogg',
		'res/sfx/Hurt.ogg',
		'res/sfx/ReadyGo.ogg',
		'res/sfx/Coin.ogg'
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