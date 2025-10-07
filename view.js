
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

function updateShapeList(drawing) {
    var shapeList = document.getElementById("shapeList");
    shapeList.innerHTML = "";
    drawing.listShapes.forEach(function(shape, index) {
        var listItem = document.createElement("li");
        var button = "<button type='button' class='btn btn-default' id='" + index + "'> <span class='glyphicon glyphicon-remove-sign'></span> </button>";
        if (shape instanceof Rectangle) {
            listItem.innerHTML = button + "Rectangle: (x: " + shape.x + ", y: " + shape.y + ", lineWidth: " + shape.lineWidth + ", color: " + shape.color + ")";
        } else if (shape instanceof Line) {
            listItem.innerHTML = button + "Line: (x: " + shape.x1 + ", y: " + shape.y1 + ", lineWidth: " + shape.lineWidth + ", color: " + shape.color + ")";
        }
        shapeList.appendChild(listItem);
    });
}

function removeShape(drawing, index) {
    drawing.listShapes.splice(index, 1);
}