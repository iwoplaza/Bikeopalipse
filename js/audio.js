var AudioManager = {};
AudioManager.masterVolume = 1;

AudioManager.setMasterVolume = function(a) {
	this.masterVolume = a;
	if(this.currentMusic)
		this.currentMusic.volume = this.currentMusic.startVolume*a;
}

AudioManager.play = function(path, volume) {
	if(!Resources.sounds[path]) {
		console.error("Couldn't play "+path);
		return;
	}
	
	if(volume != undefined)
		Resources.sounds[path].volume = volume*this.getMasterVolume();
	else
		Resources.sounds[path].volume = this.getMasterVolume();
	
	Resources.sounds[path].loop = false;
	Resources.sounds[path].play();
}

AudioManager.stopAndPlay = function(path, volume) {
	if(!Resources.sounds[path]) {
		console.error("Couldn't play "+path);
		return;
	}
	
	if(volume != undefined)
		Resources.sounds[path].volume = volume*this.getMasterVolume();
	else
		Resources.sounds[path].volume = this.getMasterVolume();
	
	Resources.sounds[path].currentTime = 0;
	Resources.sounds[path].loop = false;
	Resources.sounds[path].play();
}

AudioManager.playMusic = function(path, volume) {
	if(this.currentMusic && this.currentMusic != Resources.sounds[path]) {
		this.currentMusic.pause();
		this.currentMusic.currentTime = 0;
	}
	this.currentMusic = Resources.sounds[path];
	if(volume != undefined)
		Resources.sounds[path].volume = volume*this.getMasterVolume();
	else
		Resources.sounds[path].volume = this.getMasterVolume();
	
	this.currentMusic.startVolume = this.currentMusic.volume;
	
	if(Stats.music) {
		AudioManager.playLoop(path, volume*this.getMasterVolume());
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
		Resources.sounds[path].volume = volume*this.getMasterVolume();
	else
		Resources.sounds[path].volume = this.getMasterVolume();
	
	Resources.sounds[path].loop = true;
	Resources.sounds[path].play();
}

AudioManager.setVolume = function(path, volume) {
	if(!Resources.sounds[path]) {
		console.error("Couldn't set volume for "+path);
		return;
	}
	
	if(volume != undefined)
		Resources.sounds[path].volume = volume*this.getMasterVolume();
	else
		Resources.sounds[path].volume = this.getMasterVolume();
}

AudioManager.getMasterVolume = function() {
	return this.masterVolume;
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
	if(this.currentMusic)
		this.currentMusic.pause();
}