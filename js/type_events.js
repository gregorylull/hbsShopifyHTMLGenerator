/*

  PAGE
    - HEADER
    - BLURB

  EVENT
    - name
    - location
    - description
    - date
    - RSVP
*/

var app = window.myApp;

app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend("Events Page - Typography"));
  var sectionArray = [];

  /*---------------------------------------------------------------------------
    PAGE INFO
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  var tablePrefix = "Page: ";
  var tableName = [
    "Header",
    "Blurb",
  ];

  var namePrefix = "eventspage_type_page_";
  var nameMain = [
    "title",
    "text",
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    EVENT INFO
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  var tablePrefix = "Event: ";
  var tableName = [
    "Name",
    "Date",
    "Location",
    "Description",
    "RSVP Link"
  ];

  var namePrefix = "eventspage_type_event_";
  var nameMain = [
    "name",
    "date",
    "location",
    "text",
    "rsvp"
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