
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing() {
    this.listShapes = new Array();
    this.undoStack = [];
    this.redoStack = [];
}

Drawing.prototype.saveState = function() {
    this.undoStack.push(this.listShapes.slice());
    this.redoStack = [];
};

Drawing.prototype.undo = function() {
    if (this.undoStack.length > 0) {
        this.redoStack.push(this.listShapes.slice());
        this.listShapes = this.undoStack.pop();
    }
};

Drawing.prototype.redo = function() {
    if (this.redoStack.length > 0) {
        this.undoStack.push(this.listShapes.slice());
        this.listShapes = this.redoStack.pop();
    }
};

function Shape(color, lineWidth) {
    this.color = color;
    this.lineWidth = lineWidth;
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

function Elipse(x, y, radiusX, radiusY, lineWidth, color) {
    this.x = x;
    this.y = y;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    Shape.call(this, color, lineWidth);
}

function Triangle(x1, y1, x2, y2, x3, y3, lineWidth, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    Shape.call(this, color, lineWidth);
}