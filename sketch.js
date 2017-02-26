var symbolSize = 15;
var numStreams = symbolSize + 10;
var streams = [];

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    var x = 0;
    for (var i = 0; i <= width / numStreams; i++) {
        stream = new Stream();
        stream.generateSymbols(
            x, 
            random(-1000,0)
        );
        streams.push(stream);
        x += numStreams;
    }

    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    streams.forEach(function(stream) {
        stream.render();
    });

}

function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(5, 8));
    this.first = first;

    this.opacity = opacity;


    this.setToRandomSymbol = function() {

        if (frameCount % this.switchInterval == 0) {
            // Katakana Unicode
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            );
        }
    }

    this.rain = function() {
        // ? = if it is      : = otherwise
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}


function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5,10);
    

    this.generateSymbols = function(x,y) {
        var opacity = 255;
        var first = round(random(0, 8)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first, opacity);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
            opacity -= (255 / this.totalSymbols) / 1.3;
        }
    }

    this.render = function() {
        this.symbols.forEach(function(symbol) {
            if (symbol.first) {
                fill(180, 255, 180, symbol.opacity);
            }
            else {
                fill(0, 255, 100, symbol.opacity);
            }
            
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}