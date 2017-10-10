function Conversation() {
    this.nodes = [];
}

Conversation.prototype.addNode = function(_node) {
    this.nodes.push(_node);
	return this;
};

function ConvNode(_talker, _text, _expression) {
    this.talker = _talker ? _talker : null;
    this.text = _text ? _text : "";
	this.expression = _expression;
};