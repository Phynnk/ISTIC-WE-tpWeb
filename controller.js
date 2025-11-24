var editingMode = { rect: 0, line: 1, triangle: 2, elipse: 3, polygon: 4 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
	$('#butRect').click(function() {
	  this.currEditingMode = editingMode.rect;
	}.bind(this));
	$('#butLine').click(function() {
	  this.currEditingMode = editingMode.line;
	}.bind(this));
	$("#butTriangle").click(function() {
	  this.currEditingMode = editingMode.triangle;
	}.bind(this));
	$("#butElipse").click(function() {
	  this.currEditingMode = editingMode.elipse;
	}.bind(this));
	$("#butPolygon").click(function() {
	  this.currEditingMode = editingMode.polygon;
	}.bind(this));
	$('#spinnerWidth').change(function() {
	  this.currLineWidth = $('#spinnerWidth').val();
	}.bind(this));
	$('#colour').change(function() {
	  this.currColour = $('#colour').val();
	}.bind(this));
	$('#shapeList').click(function(e) {
    var button = e.target.closest("button");
    if (button) {
        var index = parseInt(button.id);
        removeShape(drawing, index);
        drawing.paint(ctx, canvas);
        updateShapeList(drawing);
    }
	}.bind(this));

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
	this.onInteractionStart = function(dnd) {
	if (this.currEditingMode === editingMode.rect) {
	  this.currentShape = new Rectangle(dnd.coordXStart, dnd.coordYStart, 0, 0, this.currLineWidth, this.currColour);
	} else if (this.currEditingMode === editingMode.line) {
	  this.currentShape = new Line(dnd.coordXStart, dnd.coordYStart, dnd.coordXStart, dnd.coordYStart, this.currLineWidth, this.currColour);
	} else if (this.currEditingMode === editingMode.triangle) {
	  this.currentShape = new Triangle(dnd.coordXStart, dnd.coordYStart, dnd.coordXStart, dnd.coordYStart, dnd.coordXStart, dnd.coordYStart, this.currLineWidth, this.currColour);
	} else if (this.currEditingMode === editingMode.elipse) {
		this.currentShape = new Elipse(dnd.coordXStart, dnd.coordYStart, 0, 0, this.currLineWidth, this.currColour);
	}
	drawing.listShapes.push(this.currentShape);
	drawing.paint(ctx, canvas);
	updateShapeList(drawing);
	};

	this.onInteractionUpdate = function(dnd) {
    if (this.currEditingMode === editingMode.rect) {
        this.currentShape.width = dnd.coordXEnd - dnd.coordXStart;
        this.currentShape.height = dnd.coordYEnd - dnd.coordYStart;
    } else if (this.currEditingMode === editingMode.line) {
        this.currentShape.x2 = dnd.coordXEnd;
        this.currentShape.y2 = dnd.coordYEnd;
    } else if (this.currEditingMode === editingMode.triangle) {
        this.currentShape.x2 = dnd.coordXEnd;
        this.currentShape.y2 = dnd.coordYEnd;
        this.currentShape.x3 = dnd.coordXStart;
        this.currentShape.y3 = dnd.coordYEnd;
    } else if (this.currEditingMode === editingMode.elipse) {
        this.currentShape.radiusX = Math.abs(dnd.coordXEnd - dnd.coordXStart) / 2;
        this.currentShape.radiusY = Math.abs(dnd.coordYEnd - dnd.coordYStart) / 2;
        this.currentShape.x = (dnd.coordXStart + dnd.coordXEnd) / 2;
        this.currentShape.y = (dnd.coordYStart + dnd.coordYEnd) / 2;
    }
    drawing.paint(ctx, canvas);
};

this.onInteractionEnd = function(dnd) {
    if (this.currEditingMode === editingMode.rect) {
        this.currentShape.width = dnd.coordXEnd - dnd.coordXStart;
        this.currentShape.height = dnd.coordYEnd - dnd.coordYStart;
    } else if (this.currEditingMode === editingMode.line) {
        this.currentShape.x2 = dnd.coordXEnd;
        this.currentShape.y2 = dnd.coordYEnd;
    } else if (this.currEditingMode === editingMode.triangle) {
        this.currentShape.x2 = dnd.coordXEnd;
        this.currentShape.y2 = dnd.coordYEnd;
        this.currentShape.x3 = dnd.coordXStart;
        this.currentShape.y3 = dnd.coordYEnd;
    } else if (this.currEditingMode === editingMode.elipse) {
        this.currentShape.radiusX = Math.abs(dnd.coordXEnd - dnd.coordXStart) / 2;
        this.currentShape.radiusY = Math.abs(dnd.coordYEnd - dnd.coordYStart) / 2;
        this.currentShape.x = (dnd.coordXStart + dnd.coordXEnd) / 2;
        this.currentShape.y = (dnd.coordYStart + dnd.coordYEnd) / 2;
    }
    drawing.paint(ctx, canvas);
    this.currentShape = 0;
};
};


