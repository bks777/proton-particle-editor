/**
 * Model of emitter
 * @constructor
 */
var ModelExport = function () {

    /**
     * Model of emitter
     * @type {{initializes: *[], behaviours: *[], rate: {Rate: string[]}}}
     */
    var model = {

        "initializes": [
            {"Mass": ["massPan"]},
            {"ImageTarget": ["w","h"]},
            {"Life": ["lifePan"]},
            {"Velocity": ["rPan", "thaPan", "type"]}
        ],
        "behaviours": [
            {"Alpha":  ["id", "age", "energy", "dead","same", "a", "b"]},
            {"Attraction": [ "energy", "dead","targetPosition", "radius", "force", "radiusSq", "attractionForce", "lengthSq"]},
            {"Gravity": ["force"]},
            {"RandomDrift": ["id", "age", "energy", "dead", "panFoce", "delay", "time"]},
            {"Rotate":  ["a", "b"]},
            {"Scale": [ "a", "b"]}
        ],
        "rate": {
            "Rate": ["numPan", "timePan"]
        }
    };

    /**
     * Get model of emitter
     * @returns {{initializes: *[], behaviours: *[], rate: {Rate: string[]}}}
     */
    this.getModel = function () {
        return model;
    }
};