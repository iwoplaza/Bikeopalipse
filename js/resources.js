var Resources = {
	imagesToLoad: [
		'res/img/world/background_dawn.png',
		'res/img/world/skyline_dawn.png',
		'res/img/world/middleground_dawn.png',
		'res/img/world/building01.png',
        'res/img/world/building02.png',
        'res/img/world/building03.png',
        'res/img/world/building04.png',
        'res/img/world/building05.png',
        'res/img/world/house01.png',
        'res/img/world/house02.png',
        'res/img/world/house03.png',
		'res/img/world/shield.png',
        'res/img/world/magnet.png',
        'res/img/world/explosion.png',
		'res/img/world/roads.png',
		'res/img/world/obstacles.png',
		'res/img/world/meteor.png',
		'res/img/world/zombies.png',
		'res/img/world/coin.png',
		'res/img/ui/title.png',
		'res/img/ui/icons.png',
		'res/img/ui/buttons.png',
		'res/img/ui/extra_salary.png',
		'res/img/ui/gameover.png',
		'res/img/ui/321go.png',
		'res/img/ui/powerups.png',
		'res/img/ui/controls.png',
		'res/img/ui/map.png',
		'res/img/ui/selector.png',
		'res/img/ui/node.png',
		'res/img/ui/avatar/vance.png',
		'res/img/ui/avatar/miro.png',
		'res/img/character/characters.png',
		'res/img/character/vance.png',
		'res/img/character/stewart.png',
		
		'res/font/regular.png',
		'res/font/slim.png',
		
        'res/img/intro/0/px0000.png',
        'res/img/intro/0/px0001.png',
        'res/img/intro/1/px0000.png',
        'res/img/intro/1/px0001.png',
        'res/img/intro/1/px0002.png',
		'res/img/intro/2/px0000.png',
        'res/img/intro/2/px0001.png',
        'res/img/intro/2/px0002.png',
        'res/img/intro/2/px0003.png',
		'res/img/intro/3/px0000.png',
        'res/img/intro/3/px0001.png',
	],
	soundsToLoad: [
		'res/sfx/Apoca.ogg',
		'res/sfx/Lobby.ogg',
		'res/sfx/Hurt.ogg',
		'res/sfx/ReadyGo.ogg',
		'res/sfx/Coin.ogg',
		'res/sfx/Powerup.ogg',
		'res/sfx/Explosion.ogg',
		'res/sfx/Click.ogg',
		'res/sfx/Error.ogg',
		'res/sfx/Start.ogg',
		'res/sfx/Go.ogg'
	],
	shadersToLoad: [
		'default', 'solid', 'textured', 'cutout'
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
		Resources.images[imagePath] = new Texture(this);
		Resources.loadNextImage();
	}
}

Resources.loadNextSound = function() {
	if(this.soundsToLoad.length == 0) {
		console.log("Sounds loaded!");
		this.loadNextShader();
		return;
	}
	var soundPath = this.soundsToLoad.pop();
	Resources.sounds[soundPath] = new Audio(soundPath);
	Resources.loadNextSound();
}

Resources.loadNextShader = function() {
	if(this.shadersToLoad.length == 0) {
		console.log("Resources loaded!");
		this.callback();
		return;
	}
	var shaderName = this.shadersToLoad.pop();
	Shaders.loadResource(shaderName);
}