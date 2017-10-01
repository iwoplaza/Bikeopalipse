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
	
	var width = this.getTextWidth(_text);
	if(this.alignment == "center"){
		ctx.translate(-width/2, 0);
	}else if(this.alignment == "right"){
		ctx.translate(-width, 0);
	}
	
	for(var i = 0; i < _text.length; i++) {
		var char = this.characters[_text[i]];
		if(char) {
			ctx.drawImage(this.image, char.pos.x, char.pos.y, char.dims.x, char.dims.y, 0, 0, char.dims.x, char.dims.y);
			ctx.translate(char.dims.x+this.letterSpacing, 0);
		}
	}
	ctx.restore();
}

Font.prototype.getTextWidth = function(_text) {
	var width = -this.letterSpacing;
	for(var i = 0; i < _text.length; i++) {
		var char = this.characters[_text[i]];
		if(char) {
			width += char.dims.x+this.letterSpacing;
		}
	}
	return width;
}

function Character(_pos, _dims) {
	this.pos = _pos ? _pos : new Vector2(0, 0);
	this.dims = _dims ? _dims : new Vector2(0, 0);
}

Fonts = {};

Fonts.init = function() {
	this.regular = new Font('res/font/regular.png',
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
			'm': [68, 0, 7, 10],
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
	
	this.slim = new Font('res/font/slim.png',
		{
			' ': [0, 50, 6, 10],
			'a': [0, 0, 5, 7],
			'b': [6, 0, 5, 7],
			'c': [12, 0, 5, 7],
			'd': [18, 0, 5, 7],
			'e': [24, 0, 5, 7],
			'f': [30, 0, 5, 7],
			'g': [36, 0, 5, 7],
			'h': [42, 0, 5, 7],
			'i': [48, 0, 1, 7],
			'j': [50, 0, 4, 7],
			'k': [55, 0, 5, 7],
			'l': [61, 0, 4, 7],
			'm': [66, 0, 5, 7],
			'n': [72, 0, 5, 7],
			'o': [78, 0, 5, 7],
			'p': [84, 0, 5, 7],
			'q': [90, 0, 5, 7],
			'r': [96, 0, 5, 7],
			's': [102, 0, 5, 7],
			't': [108, 0, 5, 7],
			'u': [114, 0, 5, 7],
			'v': [120, 0, 5, 7],
			'w': [0, 8, 5, 7],
			'x': [6, 8, 5, 7],
			'y': [12, 8, 5, 7],
			'z': [18, 8, 5, 7],
			'.': [24, 8, 2, 7],
			',': [27, 8, 2, 8],
			':': [30, 8, 2, 8],
		
		
			'0': [0, 19, 5, 7],
			'1': [6, 19, 4, 7],
			'2': [11, 19, 5, 7],
			'3': [17, 19, 5, 7],
			'4': [23, 19, 5, 7],
			'5': [29, 19, 5, 7],
			'6': [35, 19, 5, 7],
			'7': [41, 19, 5, 7],
			'8': [47, 19, 5, 7],
			'9': [53, 19, 5, 7],
		}
	);
}