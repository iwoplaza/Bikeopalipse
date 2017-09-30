var AudioManager = {};

AudioManager.play = function(path, volume) {
	if(!Resources.sounds[path]) {
		console.error("Couldn't play "+path);
		return;
	}
	
	if(volume != undefined)
		Resources.sounds[path].volume = volume;
	
	Resources.sounds[path].loop = false;
	Resources.sounds[path].play();
}

AudioManager.stopAndPlay = function(path, volume) {
	if(!Resources.sounds[path]) {
		console.error("Couldn't play "+path);
		return;
	}
	
	if(volume != undefined)
		Resources.sounds[path].volume = volume;
	
	Resources.sounds[path].currentTime = 0;
	Resources.sounds[path].loop = false;
	Resources.sounds[path].play();
}

AudioManager.playMusic = function(path, volume) {
	if(Stats.music) {
		this.currentMusic = Resources.sounds[path];
		AudioManager.playLoop(path, volume);
	}
}

AudioManager.playSFX = function(path, volume) {
	if(Stats.sfx)
		AudioManager.stopAndPlay(path, volume);
}

AudioManager.playLoop = function(path, volume) {
	if(!Resources.sounds[path]) {
		console.error("Couldn't play "+path);
		return;
	}
	
	if(volume != undefined)
		Resources.sounds[path].volume = volume;
	
	Resources.sounds[path].loop = true;
	Resources.sounds[path].play();
}

AudioManager.setVolume = function(path) {
	if(!Resources.sounds[path]) {
		console.error("Couldn't set volume for "+path);
		return;
	}
	
	if(volume != undefined)
		Resources.sounds[path].volume = volume;
}

AudioManager.enableMusic = function() {
	Stats.setMusic(true);
	if(this.currentMusic != undefined) {
		this.currentMusic.loop = true;
		this.currentMusic.play();
	}
}

AudioManager.disableMusic = function() {
	Stats.setMusic(false);
	this.currentMusic.pause();
}