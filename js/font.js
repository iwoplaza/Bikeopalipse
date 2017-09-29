function Font(_path, _chars) {
	this.image = Resources.images[_path];
	this.characters = [];
	for(let key in _chars) {
		var value = _chars[key];
		var char = new Character(new Vector2(value[0],value[1]),new Vector2(value[2],value[3]));
		this.characters[key] = char;
	}
	
	this.alignment = "left";
	this.letterSpacing = 1;
}

Font.prototype.setAlignment = function(_alignment) {
	this.alignment = _alignment;
}

Font.prototype.setLetterSpacing = function(_value) {
	this.letterSpacing = _value;
}

Font.prototype.drawText = function(_text, _x, _y) {
	ctx.save();
	ctx.translate(_x, _y);
	for(var i = 0; i < _text.length; i++) {
		var char = this.characters[_text[i]];
		if(char) {
			ctx.drawImage(this.image, char.pos.x, char.pos.y, char.dims.x, char.dims.y, 0, 0, char.dims.x, char.dims.y);
			ctx.translate(char.dims.x+this.letterSpacing, 0);
		}
	}
	ctx.restore();
}


function Character(_pos, _dims) {
	this.pos = _pos ? _pos : new Vector2(0, 0);
	this.dims = _dims ? _dims : new Vector2(0, 0);
}

Fonts = {};

Fonts.init = function() {
	this.regular = new Font('res/font/font.png',
		{
			' ': [0, 20, 6, 10],
			'a': [0, 0, 6, 10],
			'b': [6, 0, 6, 10],
			'c': [12, 0, 6, 10],
			'd': [18, 0, 6, 10],
			'e': [24, 0, 6, 10],
			'f': [30, 0, 6, 10],
			'g': [36, 0, 6, 10],
			'h': [42, 0, 6, 10],
			'i': [48, 0, 2, 10],
			'j': [50, 0, 6, 10],
			'k': [56, 0, 6, 10],
			'l': [62, 0, 6, 10],
			'm': [68, 0, 6, 10],
			'n': [75, 0, 6, 10],
			'o': [81, 0, 6, 10],
			'p': [87, 0, 6, 10],
			'q': [93, 0, 6, 10],
			'r': [99, 0, 6, 10],
			's': [105, 0, 6, 10],
			't': [111, 0, 6, 10],
			'u': [117, 0, 6, 10],
		
			'v': [0, 10, 7, 10],
			'w': [7, 10, 10, 10],
			'x': [17, 10, 7, 10],
			'y': [24, 10, 6, 10],
			'z': [30, 10, 6, 10],
		
			'0': [36, 10, 6, 10],
			'1': [42, 10, 5, 10],
			'2': [47, 10, 6, 10],
			'3': [53, 10, 6, 10],
			'4': [59, 10, 6, 10],
			'5': [65, 10, 6, 10],
			'6': [71, 10, 6, 10],
			'7': [77, 10, 6, 10],
			'8': [83, 10, 6, 10],
			'9': [89, 10, 6, 10],
			':': [95, 10, 2, 10],
		}
	);
}