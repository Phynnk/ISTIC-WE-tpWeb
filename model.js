
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing() {
    this.listShapes = new Array();
}

function Shape(color, lineWidth) {
    this.color = color;
    this.lineWidth = lineWidth;
    this.index = -1;
}

function Rectangle(x, y, width, height, lineWidth, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    Shape.call(this, color, lineWidth);
}

function Line(x1, y1, x2, y2, lineWidth, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    Shape.call(this, color, lineWidth);
}