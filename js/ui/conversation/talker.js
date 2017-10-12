function Talker(_name) {
	this.name = _name;
    this.image = Resources.images['res/img/ui/avatar/'+this.name+'.png'];
}

Talkers = {};

Talkers.init = function() {
	this.registry = {
		'vance': new Talker('vance'),
		'miro': new Talker('miro')
	};
};