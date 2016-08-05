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
        step: 1
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

        if (["Scale", "Alpha", "Rotate"].indexOf(name) !== -1) {
            guiElement.addToFolder(folderName, "From: Min", beh.a.a, BEH_RANGES[name].min, BEH_RANGES[name].max)
                .onChange( function(value){ beh.a.a = value; })
                .step(BEH_RANGES[name].step);
        }
    }
);


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
            guiElement.addToFolder(folderName, "Drift X", beh.panFoce.x*0.01, -250, 250)
                .onChange(function(value){ beh.panFoce.x = value*100;});

            guiElement.addToFolder(folderName, "Drift Y", beh.panFoce.y*0.01, -250, 250)
                .onChange(function(value){ beh.panFoce.y = value*100;});

            guiElement.addToFolder(folderName, "Delay", beh.delay, 0, 500)
                .onChange(function(value){beh.delay = value;});

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
        maxP = params.length;

    console.log(object);

    var data = {
        "initializes": object["initializes"],
        "behaviours": object["behaviours"]
    };

    var _data = new Export(data);
    console.log(_data.execute());
    return ;//_data.execute();


    for (i; i < maxP; i++) {
        paramObj[params[i]] = {};
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
        // guiElement.config.Basic._folderHandler.__ul.childNodes[1].firstChild.childNodes[1].innerHtml = file.name;
        var reader = new FileReader();

        reader.onload = (function() {
            return function(e) {
                proton.emitters[0].initializes[1].image.colorArr[0] =
                    (new createjs.Bitmap(e.target.result));
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

guiElement.addFolder('SPAWN');

guiElement.addToFolder('SPAWN', "Prtcl/Spwn:Min", proton.emitters[0].rate.numPan.a, 0, 1000)
    .onChange(function(value){ proton.emitters[0].rate.numPan.a = value;})
    .step(1);
guiElement.addToFolder('SPAWN', "Prtcl/Spwn:Max", proton.emitters[0].rate.numPan.b, 0, 3000)
    .onChange(function(value){ proton.emitters[0].rate.numPan.b = value;})
    .step(1);
guiElement.addToFolder('SPAWN', "Spawn time: Min", proton.emitters[0].rate.timePan.a, 0, 10)
    .onChange(function(value){ proton.emitters[0].rate.numPan.a = value;})
    .step(0.1);
guiElement.addToFolder('SPAWN', "Spawn time: Max", proton.emitters[0].rate.timePan.b, 0, 10)
    .onChange(function(value){ proton.emitters[0].rate.numPan.b = value;})
    .step(0.1);

