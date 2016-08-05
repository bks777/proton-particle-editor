var canvas;
var stage;
var proton;
var bitmap;
var renderer;
var stats;
var CONFIG = {
    attraction : new Proton.Attraction({
        x : 0,
        y : 0
    }, 1, 200),

    alpha : new Proton.Alpha(1, 0.5),

    gravity : new Proton.Gravity(8)
};

Main();

function Main() {
    canvas = document.getElementById("testCanvas");
    canvas.width = 1003;
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
    emitter.rate = new Proton.Rate(new Proton.Span(5, 30), new Proton.Span(.2, .5));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.ImageTarget(bitmap));
    emitter.addInitialize(new Proton.Life(0, 1));
    emitter.addInitialize(new Proton.Velocity(new Proton.Span(3, 9), new Proton.Span(0, 30, true), 'polar'));

    /*Behaiviors*/
    // emitter.addBehaviour(CONFIG.alpha);
    // emitter.addBehaviour(CONFIG.attraction);
    //Collision
    //Color
    //CrossZone
    //Force
    // emitter.addBehaviour(CONFIG.gravity);
    //GravityWell
    // emitter.addBehaviour(new Proton.RandomDrift(30, 30, .05));
    //Repulsion
    // emitter.addBehaviour(new Proton.Rotate(0, Proton.getSpan(-8, 9), 'add'));
    // emitter.addBehaviour(new Proton.Scale(new Proton.Span(1, 3), 0.3));

    emitter.p.x = 300;
    emitter.p.y = 300;

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

function tick() {
    stats.begin();
    proton.update();
    stage.update();
    stats.end();
}