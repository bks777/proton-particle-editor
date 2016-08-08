function Main() {
    this.templates = [];
    // this.createAllTextures();
}

Main.prototype.setTemplate = function(template) {
    this.templates.push(template);
};

Main.prototype.getAllTemplates = function() {
    var rez = {};

    this.templates.forEach(function(el) {
        rez[el.constructor.name] = el
    });

    return rez;
};

// Main.prototype.createAllTextures = function() {
//     var textures = {};
//
//     IMAGES.forEach(function(im) {
//         textures[im] = new createjs.Bitmap("images/" + im + ".png");
//     });
//
//     return textures;
// };

var main = new Main();