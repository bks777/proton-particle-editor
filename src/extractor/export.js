var Export = function (_data) {

    this._data = _data;

    var model = new ModelExport();

    this._modelsOfProperties = {};

    /**
     * Get model
     * @returns {{initializes: *[], behaviours: *[], rate: {Rate: string[]}}}
     * @private
     */
    this.getModel = function () {
        return model.getModel();
    };

    /**
     * Get proton settings components
     * @returns {{}}
     * @private
     */
    this._getObjects = function () {

        var _objects = {};

        var _keys = Object.keys(this.getModel());

        for(var i = 0, l = _keys.length; i < l; i++){
            _objects[ _keys[i] ] = this._exportModule(this._data[ _keys[i] ], _keys[i]);
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

        if(list instanceof Array){

            for(var i = 0, l = list.length; i < l; i++){
                var el = list[i];

                _object[el.constructor.name] = this.clearProperties(list[i], type, el.constructor.name);
            }
        } else if(list instanceof Object){

            var name = Object.keys(this.getModel()[type])[0];
            _object[name] = this.clearProperties(list, type, name)
        }

        return _object;
    };

    this._findModel = function (type, nameClass) {

        var _typeModels = this.getModel()[type];

        if(_typeModels instanceof Array){

            for(var i = 0, l = _typeModels.length; i < l; i++){
                var el = _typeModels[i];

                if(Object.keys(el).indexOf(nameClass) != -1){
                    return el[nameClass];
                }
            }

            return null;
        }

        if(_typeModels instanceof Object){console.log(nameClass);
            return _typeModels[nameClass];
        }

    };

    /**
     * Clear properties by model keys
     * @param object
     * @param type
     * @param nameClass
     * @returns {{}}
     */
    this.clearProperties = function (object, type, nameClass) {

        var model = this._findModel(type, nameClass);

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

        var name = prompt("Enter the name of export file:");

        var xhr = new XMLHttpRequest();

        var body = 'name=' + encodeURIComponent(name) +
            '&exportData=' + encodeURIComponent(JSON.stringify(this._getObjects()));

        xhr.open("POST", './extractor/export.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            alert("Saved!");
        };

        xhr.send(body);


        return JSON.stringify(this._getObjects());
    };

};
