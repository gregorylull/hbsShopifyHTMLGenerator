/*
  Header Content
    - logo shield 
      + pic upload -- limit size
      + pic file url
    - logo words
      + pic upload -- limit size
      + pic file url

  Header Typography
    - menu items
*/

var app = window.myApp;

app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend("Header Logo and Typography"));
  var table = app.createTable();
  var base = "header_";
  var sectionArray = [];

  // Header Content
  fieldset.appendChild(app.createHeader("Header Shield and Banner"));

  // logo shield picture upload
  var logoShield = app.createTableRow(
      // forValueID, innerText, parent
      app.createLabel(base + "logo_shield", "Logo shield, upload a file"),

      // name, forValueID, maxWidth, maxHeight
      app.createFileUpload(base + "logo_shield", base + "logo_shield", 500, 500)
    );
  table.appendChild(logoShield);

  // logo shield picture file url
  var logoShieldLink = app.createTableRow(
      app.createLabel(base + "logo_shield_link", "Logo shield URL link (MUST start with //www and not http://)"),
      app.createInput('text', base + "logo_shield_link", base + "logo_shield_link")
    );
  table.appendChild(logoShieldLink);
  app.createSmall("An URL link will take precedence over a local file" ,table);

  // logo words picture upload
  var logoWords = app.createTableRow(
      // forValueID, innerText, parent
      app.createLabel(base + "logo_words", "Logo words, upload a file"),

      // name, forValueID, maxWidth, maxHeight
      app.createFileUpload(base + "logo_words", base + "logo_words", 500, 500)
    );
  table.appendChild(logoWords);

  // logo words picture file url
  var logoWordsLink = app.createTableRow(
      app.createLabel(base + "logo_words_link", "Logo words picture URL link (MUST start with //www and not http://)"),
      app.createInput('text', base + "logo_words_link", base + "logo_words_link")
    );
  table.appendChild(logoWordsLink);
  app.createSmall("An URL link will take precedence over a local file" ,table);
  fieldset.appendChild(table);

  /*---------------------------------------------------------------------------
    HEADER TYPOGRAPHY
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  // overall, event name, event date, event location, event description
  var tablePrefix = "Header: ";
  var tableName = [
    "Menu Items",
  ];

  var namePrefix = "header_menu_";
  var nameMain = [
    "item",
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

  return fieldset;
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  app.jsonInit();
});