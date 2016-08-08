/**
 * Import data from Proton
 * @param _data
 * @constructor
 */
var Import = function(_data){

    this._data = _data;

    this._keysExport = ['initializes', 'behaviours'];

    this._modelsOfProperties = {

        "initializes": {
            "Mass": ["massPan"],
            "ImageTarget": ["w","h"],
            "Life": ["lifePan"],
            "Velocity": ["rPan", "thaPan", "type"]
        },
        "behaviours": {
            "Alpha":  ["id", "age", "energy", "dead","same", "a", "b"],
            "Attraction": [ "energy", "dead","targetPosition", "radius", "force", "radiusSq", "attractionForce", "lengthSq"],
            "Gravity": ["force"],
            "RandomDrift": ["id", "age", "energy", "dead", "panFoce", "delay", "time"],
            "Rotate":  ["a", "b"],
            "Scale": [ "a", "b"]
        }
    };

    /**
     * Get proton settings components
     * @private
     */
    this._setObjects = function () {

        var _objects = {};

        for(var i = 0, l = this._keysExport.length; i < l; i++){
            this._importModule(this._data[ this._keysExport[i] ], this._keysExport[i]);
        }
    };

    /**
     * Export module
     * @param list
     * @param type
     * @private
     */
    this._importModule = function (list, type) {

        var key;

        for(key in list){

            var object = this._findClassInArray(type, key);

            if(object == null){
                new Error("Not found Class in emitter", type, key);
            }

            var model = this._modelsOfProperties[type][key];

            this.setupProperties(object, model, list[key]);
        }
    };

    /**
     * Find index of class by class name and type
     * @param type
     * @param className
     * @returns {object|null}
     * @private
     */
    this._findClassInArray = function (type, className) {

        var list = emitter[type];

        var instance = Proton[className];

        for(var i = 0, l = list.length; i < l; i++){
            if(list[i] instanceof instance){
                return list[i];
            }
        }

        return null;
    };

    /**
     * Setup properties for Object
     * @param object
     * @param model
     * @param properties
     */
    this.setupProperties = function (object, model, properties) {

        for(var i = 0, l = model.length; i < l; i++){

            try{
                if(typeof properties[model[i]] == "object"){

                    for(var key in properties[model[i]]){
                        object[model[i]][key] = properties[model[i]][key];
                    }

                } else {
                    object[model[i]] = properties[model[i]];
                }
            } catch(e){
                console.error(e);
                break;
            }
        }
    };

    /**
     * Execute extractor
     */
    this.execute = function () {

        try{
            this._data = JSON.parse(this._data);
            this._setObjects();

        } catch(e){
            console.error(e);
        }
    };

};
