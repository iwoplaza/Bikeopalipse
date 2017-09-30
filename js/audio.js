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