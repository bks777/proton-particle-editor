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
        min: -50,
        max: 50,
        step:1
    },
    "Life": {
        min: 0,
        max: 5,
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
                "verticalPan:", beh.rPan.a, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange( function(value){ beh.rPan.a = value; })
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

guiElement.addFolder('SPAWN');

guiElement.addToFolder('SPAWN', "Prtcl/Spwn:Min", proton.emitters[0].rate.numPan.a, 0, 1000)
    .onChange(function(value){ proton.emitters[0].rate.numPan.a = value;})
    .step(1);
guiElement.addToFolder('SPAWN', "Prtcl/Spwn:Max", proton.emitters[0].rate.numPan.b, 0, 3000)
    .onChange(function(value){ proton.emitters[0].rate.numPan.b = value;})
    .step(1);
guiElement.addToFolder('SPAWN', "Spawn time: Min", proton.emitters[0].rate.timePan.a, 0, 10)
    .onChange(function(value){ proton.emitters[0].rate.numPan.a = value;})
    .step(0.01);
guiElement.addToFolder('SPAWN', "Spawn time: Max", proton.emitters[0].rate.timePan.b, 0, 10)
    .onChange(function(value){ proton.emitters[0].rate.numPan.b = value;})
    .step(0.01);

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
            guiElement.addToFolder(folderName, "Attraction X", beh.targetPosition.x)
                .onChange(function(value){beh.targetPosition.x = value;});

            guiElement.addToFolder(folderName, "Attraction Y", beh.targetPosition.y)
                .onChange(function(value){beh.targetPosition.y = value;});

            guiElement.addToFolder(folderName, "Attraction Force", beh.force, 0, 500)
                .onChange(function(value){beh.reset(beh.targetPosition, value, beh.radius);});

            guiElement.addToFolder(folderName, "Attraction Radius", beh.radius)
                .onChange(function(value){beh.radius = value;});
        }

        if (name === "RandomDrift") {
            guiElement.addToFolder(folderName, "Drift X", beh.panFoce.x * 0.01, -250, 250)
                .onChange(function(value){ beh.panFoce.x = value * 100;});

            guiElement.addToFolder(folderName, "Drift Y", beh.panFoce.y * 0.01, -250, 250)
                .onChange(function(value){ beh.panFoce.y = value * 100;});

            guiElement.addToFolder(folderName, "Delay", beh.delay, 0, 500)
                .onChange(function(value){beh.delay = value;});
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

guiElement.add('EXTRACT!', getParamsObject);

function getParamsObject() {
    var object = emitter,
        params = ['initializes', 'behaviours'],
        paramObj = {},
        i = 0,
        j,
        maxP = params.length,
        data = {
            "initializes": object["initializes"],
            "behaviours": object["behaviours"]
        },
        _data = new Export(data);
    // console.info(_data.execute());

    for (i; i < maxP; i++) {
        paramObj[params[i]] = [];
        for (j = 0; j < object[params[i]].length; j++) {
            paramObj[params[i]].push(object[params[i]][j]);
        }
    }

    console.info(paramObj);
}

// guiElement.config['Image Path'] = 'minion.png';
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

                var spriteSheer = new createjs.SpriteSheet({
                    images: [e.target.result],
                    frames: [
                        [1, 1, 651, 81, 0, -1, -1],
                        [1, 84, 651, 81, 0, -1, -1],
                        [654, 1, 651, 81, 0, -1, -1],
                        [1, 167, 651, 81, 0, -1, -1],
                        [654, 84, 651, 81, 0, -1, -1],
                        [1, 250, 651, 81, 0, -1, -1],
                        [654, 167, 651, 81, 0, -1, -1],
                        [1, 333, 651, 81, 0, -1, -1],
                        [654, 250, 651, 81, 0, -1, -1],
                        [1, 416, 651, 81, 0, -1, -1],
                        [654, 333, 651, 81, 0, -1, -1],
                        [1, 499, 651, 81, 0, -1, -1],
                        [654, 416, 651, 81, 0, -1, -1],
                        [1307, 1, 356, 85, 0, -2, 0],
                        [1, 582, 356, 85, 0, -2, 0],
                        [1307, 88, 356, 85, 0, -2, 0],
                        [1, 669, 356, 85, 0, -2, 0],
                        [1307, 175, 356, 85, 0, -2, 0],
                        [1, 756, 356, 85, 0, -2, 0],
                        [1307, 262, 356, 85, 0, -2, 0],
                        [1, 843, 356, 85, 0, -2, 0],
                        [1307, 349, 356, 84, 0, -2, -1],
                        [1, 930, 355, 85, 0, -3, 0],
                        [1, 1017, 355, 85, 0, -3, 0],
                        [1, 1104, 355, 85, 0, -3, 0],
                        [1, 1191, 355, 85, 0, -3, 0],
                        [1, 1278, 356, 84, 0, -2, -1],
                        [1, 1364, 356, 84, 0, -2, -1],
                        [1, 1450, 356, 84, 0, -2, -1],
                        [1, 1536, 356, 84, 0, -2, -1],
                        [1, 1622, 356, 84, 0, -2, -1],
                        [654, 499, 356, 82, 0, -2, -3],
                        [1307, 435, 356, 82, 0, -2, -3],
                        [1665, 1, 97, 296, 0, -5, 0],
                        [359, 582, 97, 296, 0, -5, 0],
                        [458, 582, 97, 294, 0, -4, -2],
                        [557, 582, 95, 292, 0, -4, -4],
                        [654, 583, 356, 83, 0, -2, -2],
                        [654, 668, 356, 82, 0, -2, -3],
                        [654, 752, 356, 82, 0, -2, -3],
                        [654, 836, 356, 82, 0, -2, -3],
                        [1012, 499, 97, 294, 0, -4, -2],
                        [1111, 499, 96, 294, 0, -4, -2],
                        [1209, 499, 96, 290, 0, -4, -6],
                        [1307, 519, 356, 82, 0, -2, -3],
                        [1665, 299, 95, 292, 0, -4, -4],
                        [358, 930, 93, 291, 0, -4, -5],
                        [359, 1223, 93, 291, 0, -4, -5],
                        [1307, 603, 102, 269, 0, -2, -15],
                        [1411, 603, 102, 269, 0, -2, -15],
                        [1515, 603, 102, 271, 0, -2, -13],
                        [1619, 603, 92, 282, 0, -5, -14],
                        [453, 920, 93, 290, 0, -4, -6],
                        [454, 1212, 93, 290, 0, -4, -6],
                        [548, 920, 96, 290, 0, -4, -6],
                        [549, 1212, 94, 289, 0, -4, -7],
                        [646, 920, 97, 288, 0, -5, -8],
                        [745, 920, 95, 288, 0, -4, -8],
                        [842, 920, 94, 289, 0, -4, -7],
                        [938, 920, 93, 288, 0, -4, -8],
                        [645, 1212, 94, 287, 0, -4, -9],
                        [741, 1210, 94, 287, 0, -4, -9],
                        [837, 1211, 100, 281, 0, -4, -3],
                        [939, 1210, 92, 282, 0, -5, -14],
                        [1033, 795, 100, 279, 0, -4, -5],
                        [1033, 1076, 100, 279, 0, -4, -5],
                        [1135, 795, 93, 284, 0, -4, -12],
                        [1135, 1081, 93, 283, 0, -4, -13],
                        [1230, 874, 101, 277, 0, -3, -7],
                        [1333, 874, 100, 278, 0, -4, -6],
                        [1230, 1153, 101, 270, 0, -3, -14],
                        [1333, 1154, 102, 271, 0, -2, -13],
                        [1435, 876, 102, 274, 0, -2, -10],
                        [1437, 1152, 102, 273, 0, -2, -11],
                        [1033, 1357, 100, 271, 0, -4, -13],
                        [1135, 1366, 92, 283, 0, -5, -13],
                        [1229, 1425, 102, 271, 0, -2, -13],
                        [1333, 1427, 102, 271, 0, -2, -13],
                        [1437, 1427, 102, 273, 0, -2, -11],
                        [454, 1504, 101, 270, 0, -3, -14],
                        [557, 1503, 100, 271, 0, -4, -13],
                        [659, 1501, 101, 273, 0, -3, -11],
                        [762, 1499, 100, 275, 0, -4, -9],
                        [864, 1494, 100, 278, 0, -4, -6],
                        [1539, 876, 53, 100, 0, -6, 0],
                        [1594, 887, 101, 272, 0, -3, -12],
                        [1541, 1161, 100, 275, 0, -4, -9],
                        [1541, 1438, 100, 270, 0, -4, -14],
                        [1643, 1161, 101, 273, 0, -3, -11],
                        [1539, 978, 53, 54, 0, -5, -46],
                        [359, 1516, 52, 93, 0, -6, -7],
                        [966, 1494, 51, 83, 0, -7, -17],
                        [1643, 1436, 54, 73, 0, -6, -27],
                        [1, 1708, 58, 65, 0, -5, -35],
                        [61, 1708, 59, 62, 0, -5, -38],
                        [122, 1708, 59, 62, 0, -5, -38],
                        [183, 1708, 57, 61, 0, -5, -39],
                        [242, 1708, 55, 60, 0, -6, -40],
                        [299, 1708, 56, 55, 0, -6, -45],
                        [1539, 1034, 49, 61, 0, -4, -39],
                        [1643, 1511, 54, 55, 0, -6, -45],
                        [359, 1611, 51, 49, 0, -4, -51],
                        [359, 880, 49, 46, 0, -4, -54]
                    ],
                    animations: {
                        fire: { frames: [102, 101, 89, 100, 98, 97, 96, 94, 95, 93, 92, 91, 90, 84, 99] }
                    }
                });
                var sprite = new createjs.Sprite (spriteSheer);

                sprite.gotoAndPlay("fire");

                proton.emitters[0].initializes[1].image.colorArr[0] = (sprite);
            };
        })(file);

        reader.readAsDataURL(file);
    });
    input.click();
};
// guiElement.addToFolder('Basic', 'Image Path', guiElement.config['Image Path']);
guiElement.addToFolder('Basic', 'Upload Image', guiElement.config['Upload Image']);

guiElement.addToFolder('Basic', 'Pause', function () {
    createjs.Ticker.paused = !createjs.Ticker.paused;
    if (!createjs.Ticker.paused) {
        createjs.Ticker.addEventListener("tick", tick);
    } else {
        createjs.Ticker.removeAllEventListeners('tick')
    }

});
guiElement.addToFolder('Basic', 'On/Off', function () {
    if (proton.firstInit === true){
        createjs.Ticker.addEventListener("tick", tick);
        proton.firstInit = false;
        proton.isOn = true;
    } else {
        if(proton.isOn) {
            emitter.stopEmit();
            proton.isOn = false;
        } else {
            emitter.emit();
            proton.isOn = true;
        }
    }

});



