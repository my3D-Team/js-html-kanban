var casper = require("casper").create();
var mouse = require("mouse").create(casper);

casper.start('http://localhost:3000/', function() {
    this.echo(this.getTitle());
});
casper.then(function() {
    this.mouse.click(400, 300); // clicks at coordinates x=400; y=300
});

casper.then(function() {
    this.mouse.click(70, 70);   // clicks at coordinates x=400; y=300
    this.mouse.move(400, 300);   // moves cursor over coordinates x=400; y=300
    this.mouse.up(400, 300);   // release left button over coordinates x=400; y=300
    this.echo()
});

casper.run();