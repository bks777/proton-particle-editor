(function () {

    function Firework() {}

    Firework.prototype.createProton = function() {
        proton = new Proton;
        emitter = new Proton.Emitter();
        emitter.rate = new Proton.Rate(new Proton.Span(1, 3), 1);
        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Radius(2, 4));
        emitter.addInitialize(new Proton.P(new Proton.LineZone(10, 500, 500 - 10, 500)));
        emitter.addInitialize(new Proton.Life(1, 1.5));
        emitter.addInitialize(new Proton.V(new Proton.Span(4, 6), new Proton.Span(0, 0, true), 'polar'));
        emitter.addBehaviour(new Proton.Gravity(1));
        emitter.addBehaviour(new Proton.Color('#ff0000', 'random'));
        emitter.emit();
        proton.addEmitter(emitter);
    };

    main.setTemplate(new Firework());

})();

