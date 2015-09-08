module.exports = Endless;

function Endless() {};

Endless.prototype.view = __dirname;
Endless.prototype.style = __dirname;
Endless.prototype.name = 'd-endless';

Endless.prototype.create = function(model, dom) {
  var filterPath = model.get('filterPath');
  var elementId = model.get('elementId');

  if(!filterPath || !elementId) return;

  this.stepSize = parseInt(model.get('stepSize')) || 10;
  this.elementId = elementId;
  this.segments = filterPath.split('.');

  dom.on('scroll', this.endless.bind(this));
};

Endless.prototype.endless = function(e) {
  var el = document.getElementById(this.elementId);
  var last = el && el.lastChild.previousSibling;

  if(this.model.get('updating') || !last || !this.reachedBottom(el)) return;

  this.model.set('updating', true);
  var filter = this.pathIndex(this.app, this.segments);

  // If we're already including all results, we just abort
  if(filter.ids().length < filter.limit) return this.model.set('updating', false);

  // Otherwise we add to the limit and update the filter
  filter.limit += this.stepSize;
  filter.update();
  this.model.set('updating', false);
};

Endless.prototype.reachedBottom = function(el) {
  if(!el || !el.getBoundingClientRect || (!window && !document)) return false;

  var rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
};

Endless.prototype.pathIndex = function(app, segments) {
  var segments = segments.slice(0);

  if(segments.length <= 0) return app;
  if(segments[0].toLowerCase() === 'app') segments.shift();

  app = app[segments.shift()];
  return this.pathIndex(app, segments);
};