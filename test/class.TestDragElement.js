casper.test.begin('Login page tests', 1, function suite(test) {
    casper.start('https://google.fr');

    casper.then(function() {
        this.echo(this.getHTML('div#hplogo'));
    });

    casper.run(function() {
        test.assertExists('div#hplogo');
        test.done();
    });
});
