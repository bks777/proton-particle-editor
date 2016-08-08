var Export = function (_data) {

    this._data =_data;

    this.execute = function () {

        return JSON.stringify(this._data, function(key, value) {
            return (typeof value === 'function' ) ? value.toString() : value;
        }, 2);
    }
};
