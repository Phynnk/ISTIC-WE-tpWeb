
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
  this.coordXStart = 0;
  this.coordYStart = 0;
  this.coordXEnd = 0;
  this.coordYEnd = 0;

	// Developper les 3 fonctions gérant les événements
  this.drag = function(evt) {
    var mousePos = getMousePosition(canvas, evt);
    this.coordXStart = mousePos.x;
    this.coordYStart = mousePos.y;
    interactor.onInteractionStart(this);
  };
  this.dragging = function(evt) {
    var mousePos = getMousePosition(canvas, evt);
    this.coordXEnd = mousePos.x;
    this.coordYEnd = mousePos.y;
    interactor.onInteractionUpdate(this);
  };
  this.drop = function(evt) {
    var mousePos = getMousePosition(canvas, evt);
    this.coordXEnd = mousePos.x;
    this.coordYEnd = mousePos.y;
    interactor.onInteractionEnd(this);
  };

	// Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener('mousedown', this.drag, false);
  canvas.addEventListener('mousemove', this.dragging, false);
  canvas.addEventListener('mouseup', this.drop, false);

};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



