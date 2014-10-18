$(function () {
  var app = window.myApp;

  var options = {};
  options.value = [];
  options.price = [];
  options.text = [];

  var children = $("#select_47").children();
  children.each(function (index) {
    options.value.push($(this).attr('value'));
    options.price.push($(this).attr('price'));
    options.text.push($(this).text());
  });

  // create a table with the new date
  var div = $('<div></div>').attr('id', 'wrap');
  var table = app.createTable();
  table.setAttribute('class', 'table table-striped');
  div.append(table);
  $('body').append(div);

  // create headers
  app.createTableRow(
    "value",
    "price",
    "text",
    table
  );

  // create individual rows
  for (var i = 0; i < options.value.length; i++) {
    app.createTableRow(
      options.value[i],
      options.price[i],
      options.text[i],
      table
    );
  }
});
