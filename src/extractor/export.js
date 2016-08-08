var Export = function (_data) {

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
     * @returns {{}}
     * @private
     */
    this._getObjects = function () {

        var _objects = {};

        for(var i = 0, l = this._keysExport.length; i < l; i++){
            _objects[ this._keysExport[i] ] = this._exportModule(this._data[ this._keysExport[i] ], this._keysExport[i]);
        }

        return _objects;
    };

    /**
     * Export module
     * @param list
     * @param type
     * @returns {{}}
     * @private
     */
    this._exportModule = function (list, type) {

        var _object = {};

        for(var i = 0, l = list.length; i < l; i++){
            var el = list[i];

            _object[el.constructor.name] = this.clearProperties(list[i], type, el.constructor.name);
        }

        return _object;
    };

    /**
     * Clear properties by model keys
     * @param object
     * @param type
     * @param nameClass
     * @returns {{}}
     */
    this.clearProperties = function (object, type, nameClass) {

        var model = this._modelsOfProperties[type][nameClass];

        var _object = {};

        for(var i = 0, l = model.length; i < l; i++){
            _object[model[i]] = object[model[i]];
        }

        return _object;
    };

    /**
     * Execute extractor
     */
    this.execute = function () {

        var _data = this._getObjects();

        return JSON.stringify(_data);
    };

};
