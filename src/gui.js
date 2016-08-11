var GuiElement = function(){
    this.gui = new dat.GUI();
    this.config = {};
    this.add = function(name, value) {
        this.config[name] = value;
        return this.gui.add.apply(this.gui, [this.config, name].concat(typeof value !== "function" ? Array.prototype.slice.call(arguments,2) : [] ));
    };

    this.addFolder = function(name) {
        this.config[name] = {};
        this.config[name]._folderHandler = this.gui.addFolder(name);
        return this.config[name]._folderHandler;
    };

    this.addToFolder = function(folder, name, value) {
        this.config[folder][name] = value;
        return this.gui.add.apply(this.config[folder]._folderHandler, [this.config[folder], name].concat(typeof value !== "function" ? Array.prototype.slice.call(arguments,3) : [] ));
    };
};

var guiElement = new GuiElement();

var BEH_RANGES = {
    "Scale" : {
        min: 0,
        max: 10,
        step: .1
    },
    "Alpha" : {
        min: 0.0,
        max: 1.0,
        step: 0.1
    },
    "Rotate":  {
        min: -60,
        max: 60,
        step: 1
    },
    "Gravity": {
        min: -30,
        max: 30,
        step: 0.5
    },
    "Mass": {
        min: -60,
        max: 60,
        step: 1
    },
    "Velocity": {
        min: -360,
        max: 360,
        step:1
    },
    "Life": {
        min: 0,
        max: 20,
        step: .1
    }
};

guiElement.addFolder('Basic');
proton.emitters[0].initializes.forEach(
    function (beh) {
        var name = beh.constructor.name,
            folderName = "Initialize " + name;

        if (name === 'Mass') {

            guiElement.addFolder(folderName);
            guiElement.addToFolder(folderName,
                "From: Min", beh.massPan.a, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange( function(value){ beh.massPan.a = value; })
                .step(BEH_RANGES[name].step);
        }

        if (name === 'Velocity') {
            guiElement.addFolder(folderName);
            //rPan
            guiElement.addToFolder(folderName,
                "verticalPan: Min", beh.rPan.a, 0, 10)
                .onChange( function(value){ beh.rPan.a = value; })
                .step(BEH_RANGES[name].step);
            guiElement.addToFolder(folderName,
                "verticalPan: Max", beh.rPan.b, 0, 10)
                .onChange( function(value){ beh.rPan.b = value; })
                .step(BEH_RANGES[name].step);
            //thaPan
            guiElement.addToFolder(folderName,
                "hrzntlPan: Min", beh.thaPan.a, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange( function(value){ beh.thaPan.a = value; })
                .step(BEH_RANGES[name].step);
            guiElement.addToFolder(folderName,
                "hrzntlPan: Max", beh.thaPan.b, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange( function(value){ beh.thaPan.b = value; })
                .step(BEH_RANGES[name].step);
        }

        if (name === 'Life') {
            guiElement.addFolder(folderName);

            guiElement.addToFolder(folderName,
                "Min Life: ", beh.lifePan.a, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange( function(value){ beh.lifePan.a = value; })
                .step(BEH_RANGES[name].step);
            guiElement.addToFolder(folderName,
                "Max Life: ", beh.lifePan.b, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange( function(value){ beh.lifePan.b = value; })
                .step(BEH_RANGES[name].step);
        }

        if (["Scale", "Alpha", "Rotate"].indexOf(name) !== -1) {
            guiElement.addToFolder(folderName, "From: Min", beh.a.a, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange( function(value){ beh.a.a = value; })
                .step(BEH_RANGES[name].step);
        }

    }
);
guiElement.addToFolder('Basic', 'Upload BG', uploadBack);

guiElement.addFolder('SPAWN');

guiElement.addToFolder('SPAWN', "Prtcl/Spwn:Min", proton.emitters[0].rate.numPan.a, 0, 1000)
    .onChange(function(value){ proton.emitters[0].rate.numPan.a = value;})
    .step(1);
guiElement.addToFolder('SPAWN', "Prtcl/Spwn:Max", proton.emitters[0].rate.numPan.b, 0, 3000)
    .onChange(function(value){ proton.emitters[0].rate.numPan.b = value;})
    .step(1);
guiElement.addToFolder('SPAWN', "Spawn time: Min", proton.emitters[0].rate.timePan.a, 0, 10)
    .onChange(function(value){ proton.emitters[0].rate.timePan.a = value;})
    .step(0.1);
guiElement.addToFolder('SPAWN', "Spawn time: Max", proton.emitters[0].rate.timePan.b, 0, 10)
    .onChange(function(value){ proton.emitters[0].rate.timePan.b = value;})
    .step(0.1);

proton.emitters[0].behaviours.forEach(
    function (beh) {
        var name = beh.constructor.name,
            folderName = "Particle " + name;
        guiElement.addFolder(folderName);
        if (["Scale", "Alpha", "Rotate"].indexOf(name) !== -1) {
            guiElement.addToFolder(folderName, "From: Min", beh.a.a, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange( function(value){ beh.a.a = value; })
                .step(BEH_RANGES[name].step);

            guiElement.addToFolder(folderName, "From: Max", beh.a.b, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange(function(value){ beh.a.b = value; })
                .step(BEH_RANGES[name].step);

            guiElement.addToFolder(folderName, "To: Min", beh.b.a, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange(function(value){beh.b.a = value;})
                .step(BEH_RANGES[name].step);

            guiElement.addToFolder(folderName, "To: Max", beh.b.b, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange(function(value){beh.b.b = value;})
                .step(BEH_RANGES[name].step);
        }

        if (name === "Gravity") {
            guiElement.addToFolder(folderName, "Value", beh.force.y*0.01, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange(function(value){beh.force.y = value*100;})
                .step(BEH_RANGES[name].step);
        }

        if (name === "Attraction") {
            guiElement.addToFolder(folderName, "Attraction X", beh.targetPosition.x, -500, 500)
                .onChange(function(value){beh.targetPosition.x = value;})
                .step(10);

            guiElement.addToFolder(folderName, "Attraction Y", beh.targetPosition.y, -500, 500)
                .onChange(function(value){beh.targetPosition.y = value;})
                .step(10);

            guiElement.addToFolder(folderName, "Attraction Force", beh.force, 0, 500)
                .onChange(function(value){beh.reset(beh.targetPosition, value, beh.radius);})
                .step(10);

            guiElement.addToFolder(folderName, "Attraction Radius", beh.radius, 1, 500)
                .onChange(function(value){beh.radius = value;})
                .step(1);
        }

        if (name === "RandomDrift") {
            guiElement.addToFolder(folderName, "Drift X", beh.panFoce.x * 0.01, -180, 180)
                .onChange(function(value){ beh.panFoce.x = value * 100;});

            guiElement.addToFolder(folderName, "Drift Y", beh.panFoce.y * 0.01, -180, 180)
                .onChange(function(value){ beh.panFoce.y = value * 100;});

            guiElement.addToFolder(folderName, "Delay", beh.delay, 0, 5)
                .onChange(function(value){beh.delay = value;})
                .step(0.01);
        }

        if (name === "Color") {
            // console.info(beh);
            // guiElement.addToFolder(folderName, "Color1", beh.delay, 0, 500)
            //     .onChange(function(value){beh.delay = value;});
        }

        if (name === "CrossZone") {
            // console.info(beh);
            // guiElement.addToFolder(folderName, "Color1", beh.delay, 0, 500)
            //     .onChange(function(value){beh.delay = value;});
        }
    }
);

guiElement.add('IMPORT!', setParamsObject);
guiElement.add('EXTRACT!', getParamsObject);

/**
 * Import object properties
 */
function setParamsObject(){

    var _import = new Import();
    _import.execute();

}

function importJSONAnim(){
    var props = prompt("Enter JSON"),
        obj = JSON.parse(props);
    window.spriteSheer ={
        images: obj.images,
        frames: obj.frames,
        animations: obj.animations
    };
}

/**
 * Export object properties
 */
function getParamsObject() {

    var _data = new Export(emitter);
    console.log(">>>> EXPORT PROTON\n" + _data.execute() + "\n>>>> EXPORT PROTON");
}

guiElement.config['Upload Image'] = function () {
    var input = document.getElementById('img-path');
    input.addEventListener('change', function() {
        var file = input.files[0];
        if (!file.type.match('image.*')) {
            return;
        }
        var reader = new FileReader();

        reader.onload = (function() {
            return function(e) {
                proton.emitters[0].initializes[1].image.colorArr[0] =
                    (new createjs.Bitmap(e.target.result)); //@TODO images changed here!
                window.spriteSheer.images = [e.target.result];
                var spriteSheet = new createjs.SpriteSheet(window.spriteSheer);
                var sprite = new createjs.Sprite (spriteSheet);

                sprite.gotoAndStop("source");
                sprite.currentAnimationFrame = Math.floor(Math.random() * spriteSheet._frames.length - 1);
                sprite.play();


                proton.emitters[0].initializes[1].image.colorArr[0] = (sprite);
                window._cs = sprite;
                if (proton.firstInit === true){
                    createjs.Ticker.addEventListener("tick", tick);
                    proton.firstInit = false;
                    proton.isOn = true;
                } else {
                    proton.isOn = true;
                }
            };
        })(file);

        reader.readAsDataURL(file);
    });
    input.click();
};


guiElement.addToFolder('Basic', 'Pause', function () {
    createjs.Ticker.paused = !createjs.Ticker.paused;
    if (!createjs.Ticker.paused) {
        createjs.Ticker.addEventListener("tick", tick);
    } else {
        createjs.Ticker.removeAllEventListeners('tick')
    }

});
guiElement.addToFolder('Basic', 'Emitter X:', emitter.p.x)
    .onChange(function(value){emitter.p.x = value;});
guiElement.addToFolder('Basic', 'Emitter X:', emitter.p.y)
    .onChange(function(value){emitter.p.y = value;});

// guiElement.addToFolder('Basic', 'On/Off', function () {
//     if (proton.firstInit === true){
//         createjs.Ticker.addEventListener("tick", tick);
//         proton.firstInit = false;
//         proton.isOn = true;
//     } else {
//         if(proton.isOn) {
//             emitter.stopEmit();
//             proton.isOn = false;
//         } else {
//             emitter.emit();
//             proton.isOn = true;
//         }
//     }
//
// });

function uploadBack() {
    var input = document.getElementById('back-path');
    input.addEventListener('change', function() {
        var file = input.files[0];
        if (!file.type.match('image.*')) {
            return;
        }
        var reader = new FileReader();

        reader.onload = (function() {
            return function(e) {
                if (proton.firstInit === true){
                    createjs.Ticker.addEventListener("tick", tick);
                    proton.firstInit = false;
                    proton.isOn = true;
                } else {
                    proton.isOn = true;
                }
                stage.removeChild(window.back);
                window.back = new createjs.Bitmap(e.target.result);
                stage.addChild(window.back);
                var dimensions = window.back.getBounds();
                emitter.p.x = dimensions.width / 2;
                emitter.p.y = dimensions.height / 2;
                canvas.width = dimensions.width;
                canvas.height = dimensions.height;
            };
        })(file);

        reader.readAsDataURL(file);
    });
    input.click();
}



guiElement.addFolder('JSON');
guiElement.addToFolder('JSON', 'Upload JSON', importJSONAnim);
guiElement.addToFolder('JSON', 'Upload Image', guiElement.config['Upload Image']);
window._cs = new createjs.SpriteSheet();
guiElement.addToFolder('JSON', 'Pivot X', window._cs._regX, 0, window._cs.width)
    .onChange(function(value){ window._cs.regX = value;})
    .step(1);
guiElement.addToFolder('JSON', 'Pivot Y', window._cs._regY, 0, window._cs.height)
    .onChange(function(value){ window._cs.regY = value;})
    .step(1);
guiElement.addToFolder('JSON', 'FrameRate', window._cs.framerate, 0, 60)
    .onChange(function(value){ window._cs.framerate = value;})
    .step(1);



