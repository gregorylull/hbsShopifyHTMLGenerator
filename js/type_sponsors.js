var app = window.myApp;

app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend("Sponsors Page - Typography"));
  app.createSmall("", fieldset);
  var sectionArray = [];
  var tablePrefix, tableName, namePrefix, nameMain;

  /*---------------------------------------------------------------------------
    PAGE INFO
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  tablePrefix = "Page: ";
  tableName = [
    "Blurb"
  ];

  namePrefix = "sponsors_page_";
  nameMain = [
    'blurb'
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    Sponsor Level
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  tablePrefix = "Level: ";
  tableName = [
    "Name",
    "Description"
  ];

  namePrefix = "sponsors_level_";
  nameMain = [
    "name",
    "description",
  ];
  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    Product Variant
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  tablePrefix = "Company: ";
  tableName = [
    "Name",
    "Sponsored Events"
  ];

  namePrefix = "sponsors_company_";
  nameMain = [
    "name",
    "events",
  ];
  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));


  /*---------------------------------------------------------------------------
    FONT HTML GENERATOR
      family, size, color, weight, style
  ---------------------------------------------------------------------------*/

  app.fontGenerator(sectionArray, fieldset); // sectionArray, fieldset

  // FIELDSET!
  return fieldset;
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  app.jsonInit();
});