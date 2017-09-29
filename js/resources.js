var Resources = {
	imagesToLoad: [
		'res/img/roads.png',
		'res/img/obstacles.png',
		'res/img/player.png'
	],
	images: [],
	
	callback: null
};

Resources.loadAll = function(_callback) {
	this.callback = _callback;
	Resources.loadNext();
}

Resources.loadNext = function() {
	if(this.imagesToLoad.length == 0) {
		console.log("Resources loaded!");
		this.callback();
		return;
	}
	var imagePath = this.imagesToLoad.pop();
	var image = new Image();
	image.src = imagePath;
	image.onload = function(e) {
		Resources.images[imagePath] = this;
		Resources.loadNext();
	}
}