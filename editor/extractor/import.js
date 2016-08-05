var Import = function(){

    return function(_data){

        var data = {};

        var key;
        for(key in _data){
            data[key] = this._find(_data[key], key);
        }
    };

    /**
     * Converter from object TO string
     * @param obj
     * @returns {*}
     * @private
     */
    this._JSONStringify = function(obj)
    {
        return JSON.stringify(obj,function(key, value) {
            return (typeof value === 'function' ) ? value.toString() : value;
        });
    };

    /**
     * Convert from string to object
     * @param str
     * @returns {*}
     * @private
     */
    this._JSONParse = function(str)
    {
        return JSON.parse(str,function(key, value){
            if(typeof value != 'string') return value;
            return ( value.substring(0,8) == 'function') ? eval('('+value+')') : value;
        });
    };

    _find = function (data, key) {

    };


}
