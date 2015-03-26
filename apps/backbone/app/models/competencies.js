var Competency = Parse.Object.extend({
  className: 'Competency',
  defaults: {
    name: null,
    abbr: null
  }
});

var Competencies = Parse.Collection.extend({
  model: Competency
});

// Static definitions for now stupid
module.exports = new Competencies([
  new Competency({ name: 'Junior', abbr: 'Jr' }),
  new Competency({ name: 'Mid', abbr: 'Mid' }),
  new Competency({ name: 'Senior', abbr: 'Sr' })
]);
