
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Rectangle.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
}

Line.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
}

Drawing.prototype.paint = function(ctx, canvas) {
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.listShapes.forEach(function(shape) {
        ctx.lineWidth = shape.lineWidth;
        ctx.strokeStyle = shape.color;
        shape.paint(ctx);
    });
}

Rectangle.prototype.setIndex = function(index) {
    this.index = index;
}

Line.prototype.setIndex = function(index) {
    this.index = index;
}

function updateShapeList(drawing) {
    var shapeList = document.getElementById("shapeList");
    shapeList.innerHTML = "";
    drawing.listShapes.forEach(function(shape, index) {
        var listItem = document.createElement("li");
        shape.setIndex(index);
        var button = "<button type='button' class='btn btn-default' id='" + index + "'> <span class='glyphicon glyphicon-remove-sign'></span> </button>";
        if (shape instanceof Rectangle) {
            listItem.innerHTML = button + "Rectangle: (id: " + shape.index + ", x: " + shape.x + ", y: " + shape.y + ", lineWidth: " + shape.lineWidth + ", color: " + shape.color + ")";
        } else if (shape instanceof Line) {
            listItem.innerHTML = button + "Line: (id: " + shape.index + ", x: " + shape.x1 + ", y: " + shape.y1 + ", lineWidth: " + shape.lineWidth + ", color: " + shape.color + ")";
        }
        shapeList.appendChild(listItem);
    });
}

document.getElementById("shapeList").addEventListener("click", function(event) {
    console.log(event.target);
    if (event.target && event.target.nodeName === "BUTTON") {
        console.log("Delete shape with id: " + event.target.id);
        var index = parseInt(event.target.id);
        drawing.listShapes.splice(index, 1);
        updateShapeList(drawing);
        drawing.paint(ctx, canvas);
    }
});