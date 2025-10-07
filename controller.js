var editingMode = { rect: 0, line: 1 };

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
	}
	drawing.paint(ctx, canvas);
	this.currentShape = 0;
	};

};


