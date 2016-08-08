/**
 * Import data from Proton
 * @param _data
 * @constructor
 */
var Import = function(_data){

    this._data = _data;

    var model = new ModelExport();

    /**
     * Get model
     * @returns {{initializes: *[], behaviours: *[], rate: {Rate: string[]}}}
     * @private
     */
    this.getModel = function () {
        return model.getModel();
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
     * Get proton settings components
     * @private
     */
    this._setObjects = function () {

        var keys = Object.keys(this.getModel());

        for(var i = 0, l = keys.length; i < l; i++){
            this._importModule(this._data[ keys[i] ], keys[i]);
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

            var model = this._findModel(type, key);

            this.setupProperties(object, model, list[key]);
        }
    };

    /**
     * Find index of class by class name and type
     * @param type
     * @param className
     * @returns {null}
     * @private
     */
    this._findClassInArray = function (type, className) {

        var list = emitter[type];

        if(this.getModel()[type] instanceof Array){
            var instance = Proton[className];

            for(var i = 0, l = list.length; i < l; i++){
                if(list[i] instanceof instance){
                    return list[i];
                }
            }
        } else {
            return list
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
     * update gui
     */
    this.updateGUI = function () {


    };

    /**
     * Execute extractor
     */
    this.execute = function () {

        try{
            this._data = JSON.parse(this._data);
            this._setObjects();

            this.updateGUI();
        } catch(e){
            console.error(e);
        }
    };

};
