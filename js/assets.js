var _ = require('underscore');
var Datastore = require('nedb')
  , tasks = new Datastore({ filename: `../public/data.db`, autoload: true });



$(document).ready(function () {
  refreshTodo();
});

$('#search').keyup(function () {
  console.log($('#search').val());
  tasks.find({ text: { $regex: new RegExp($('#search').val(), 'i') } }, function (err, docs) {
    console.log(docs);
    if (docs.length > 0) {
      $('#todo').empty();
      _.each(docs, function (doc) {
        $('#todo').append(`<div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1 pointer">
          <div class="row valign-wrapper">
            <div class="col s2">
              <i class=" material-icons prefix circle responsive-img">receipt</i>
            </div>
            <div class="col s10">
              <span class="black-text">
                ${doc.text} <i class="material-icons prefix pointer right" id="${doc._id}" onclick="deleteMe(this)">delete</i>
              </span>
            </div>
          </div>
        </div>
      </div>`);
      });
    }
  });
});

$('#add-todo').submit(function () {
  tasks.insert({ text: $(this).find('#description-todo').val() });
  $(this).find('#description-todo').val("");
  refreshTodo();
  return false;
});

var refreshTodo = function () {
  $('#todo').empty();
  tasks.find({}, function (err, docs) {
    _.each(docs, function (doc) {
      $('#todo').append(`<div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1 pointer">
          <div class="row valign-wrapper">
            <div class="col s2">
              <i class=" material-icons prefix circle responsive-img">receipt</i>
            </div>
            <div class="col s10">
              <span class="black-text">
                ${doc.text} <i class="material-icons prefix pointer right" id="${doc._id}" onclick="deleteMe(this)">delete</i>
              </span>
            </div>
          </div>
        </div>
      </div>`);
    });
  });
}

deleteMe = function (object) {
  tasks.remove({ _id: $(object).prop('id') });
  refreshTodo();
}