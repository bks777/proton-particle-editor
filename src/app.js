var canvas,
    emitter,
    stage,
    proton,
    bitmap,
    renderer,
    stats,
    CONFIG = {
    attraction : new Proton.Attraction({
        x : 0,
        y : 0
    }, 1, 200),
    alpha : new Proton.Alpha(1, 1),
    gravity : new Proton.Gravity(0),
    rate: {
        timePan: {
            from: 1,
            to: 1
        },
        numPan: {
            from: 0.1,
            to: 0.1
        }
    },
    mass: 1,
    life: {
        from: 0,
        to: 1
    },
    velocity: {
        rpan: {
            from: 0,
            to: 0
        },
        thapan: {
            from: 0,
            to: 0
        },
        type: 'polar' // there are only 'polar' and 'vector' at current moment
    },
    random: {
        driftX: 0,
        driftY: 0,
        delay: 0.00
    },
    rotate: {
        from: {
            min: 0,
            max: 0
        },
        to: {
            min: 0,
            max: 0
        },
        style: 'add'
    },
    scale: {
        from: {
            min: 1,
            max: 1
        },
        to: {
            min: 1,
            max: 1
        }
    },
    position: {
        x: 500,
        y: 305
    }
};

Main();

function Main() {
    canvas = document.getElementById("testCanvas");
    canvas.width = 1000;
    canvas.height = 610;
    stage = new createjs.Stage(canvas);
    bitmap = new createjs.Bitmap('images/minion.png');
    addStats();

    createProton();
    createjs.Ticker.setFPS(60);
    proton.firstInit = true;
    proton.isOn = false;

}

function addStats() {
    stats = new Stats();
    stats.setMode(2);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('container').appendChild(stats.domElement);
}

function initEmitter(emitter){
    emitter.rate = new Proton.Rate(
        new Proton.Span(
            CONFIG.rate.numPan.from,
            CONFIG.rate.numPan.to
        ),
        new Proton.Span(
            CONFIG.rate.timePan.from,
            CONFIG.rate.timePan.to
        )
    );
    emitter.addInitialize(new Proton.Mass(CONFIG.mass));
    emitter.addInitialize(new Proton.ImageTarget(bitmap));
    emitter.addInitialize(new Proton.Life(
        CONFIG.life.from,
        CONFIG.life.to
    ));
    emitter.addInitialize(new Proton.Velocity(
        new Proton.Span(
            CONFIG.velocity.rpan.from,
            CONFIG.velocity.rpan.to
        ),
        new Proton.Span(
            CONFIG.velocity.thapan.from,
            CONFIG.velocity.thapan.to
        ),
        CONFIG.velocity.type
    ));

    /*Behaiviors*/
    emitter.addBehaviour(CONFIG.alpha);
    emitter.addBehaviour(CONFIG.attraction);
    //Collision
    // emitter.addBehaviour(new Proton.Collision())
    //Color
    // emitter.addBehaviour(new Proton.Color(
    //    'random' //@TODO inspect
    // ));
    //CrossZone
    // emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone( //@TODO inspect
    //     0,
    //     0,
    //     canvas.width,
    //     canvas.height
    // ), 'death'));
    //Force
    emitter.addBehaviour(CONFIG.gravity);
    //GravityWell
    emitter.addBehaviour(new Proton.RandomDrift(
        CONFIG.random.driftX,
        CONFIG.random.driftY,
        CONFIG.random.delay
    ));
    //Repulsion
    emitter.addBehaviour(new Proton.Rotate(
        Proton.getSpan(
            CONFIG.rotate.from.min,
            CONFIG.rotate.from.max
        ),
        Proton.getSpan(
            CONFIG.rotate.to.min,
            CONFIG.rotate.to.max
        ),
        CONFIG.rotate.style
    ));
    emitter.addBehaviour(new Proton.Scale(
        new Proton.Span(
            CONFIG.scale.from.min,
            CONFIG.scale.from.max
        ),
        new Proton.Span(
            CONFIG.scale.to.min,
            CONFIG.scale.to.max
        )
    ));
    emitter.p.x = CONFIG.position.x;
    emitter.p.y = CONFIG.position.y;

    return emitter;
}

function createProton() {
    proton = new Proton();
    emitter = initEmitter(new Proton.Emitter());
    emitter.emit();
    proton.addEmitter(emitter);
    renderer = new Proton.Renderer('easel', proton, stage);
    renderer.start();
}

function tick(evt) {
    stats.begin();
    proton.update();
    stage.update(evt);
    stats.end();
}