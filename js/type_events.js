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

  var tablePrefix, tableName, namePrefix, nameMain;

  /*---------------------------------------------------------------------------
    PAGE INFO
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  tablePrefix = "Page: ";
  tableName = [
    "Header",
    "Blurb"
  ];

  namePrefix = "eventspage_type_page_";
  nameMain = [
    "title",
    "text"
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    CLASS SECTION  cross-year, rc, ec,
  ---------------------------------------------------------------------------*/

  tablePrefix = "Class Section: ";
  tableName = [
    "Class Header",
    "Default no upcoming events"
  ];

  namePrefix = "eventspage_type_event_section_";
  nameMain = [
    "header",
    "noEvents"
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    EVENT INFO
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  tablePrefix = "Event: ";
  tableName = [
    "Name",
    "Date",
    "Location",
    "Description",
    "RSVP Link"
  ];

  namePrefix = "eventspage_type_event_";
  nameMain = [
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