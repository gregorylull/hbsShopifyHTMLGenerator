/*
  Category --> up to 8 categories
  375px wide each ? or...or...col-sm-6? anyways

  options, append header, append table
*/

var app = window.myApp;

app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend("Community Categories and Typography"));

  var headerBase = "Community Category ";
  var options = 8;

  // Content / handle
  var table = app.createTable();
  table.appendChild(app.createHeader("Community Page Handles"));
  app.createSmall("For each new category of community events, a Page must be created. The page title can be anything, but the page-handle entered here MUST be the same as the handle for the page ",table);

  // loop
  for (var i = 0; i < options; i++) {
    var base = "community_" + i + "_";
    // Category handle (not title)
    var communityHandle = app.createTableRow(
        // forValueID, innerText
        app.createLabel(base + "handle", "Community page, category " + (i+1) + " handle:"),
        app.createInput('text', base + "handle", base + "handle")
      )
    table.appendChild(communityHandle);
  }

  fieldset.appendChild(table);

  var sectionArray = [];
  /*---------------------------------------------------------------------------
    COMMUNITY PAGE TYPOGRAPHY
  ---------------------------------------------------------------------------*/

  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  var tablePrefix = "Community: ";
  var tableName = [
    "Page Header",
    "Page Description",
  ];

  var namePrefix = "community_type_";
  var nameMain = [
    "header",
    "content",
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));
  /*---------------------------------------------------------------------------
    COMMUNITY CATEGORY TYPOGRAPHY
  ---------------------------------------------------------------------------*/

  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  var tablePrefix = "Community: ";
  var tableName = [
    "Category Header",
    "Category Description",
    "Category Event List Header",
    "Category Event List"
  ];

  var namePrefix = "category_type_";
  var nameMain = [
    "header",
    "description",
    "list_header",
    "list"
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    FONT HTML GENERATOR
      family
      size
      color
      weight
      style
  ---------------------------------------------------------------------------*/

  app.fontGenerator(sectionArray, fieldset); // sectionArray, fieldset

  // FIELDSET
  return fieldset;
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  app.jsonInit();
});