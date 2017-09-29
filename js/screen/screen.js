ScreenHandler = {
    current: null,
    open: function(screen) {
        this.current = screen;
        if(screen.init)
            screen.init();
    },
    
    update: function() {
        if(this.current && this.current.update)
            this.current.update();
    },
    
    draw: function() {
        if(this.current && this.current.draw)
            this.current.draw();
    },
    
    keyDown: function(e) {
        if(this.current && this.current.keyDown)
            this.current.keyDown(e);
    },
    
    keyUp: function(e) {
        if(this.current && this.current.keyUp)
            this.current.keyUp(e);
    }
};

function enterFullscreen(e) {
    if(canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
    else if(canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    else if(canvas.requestFullscreen)
        canvas.requestFullscreen();
}