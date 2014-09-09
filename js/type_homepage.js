/*---------------------------------------------------------------------------
    HOMEPAGE font options
      - Left column headers
      - Right column headers
      - Upcoming events OVERALL
         + header
           - size
           - font-family
           - etc.
      - Contact us OVERALL defaults to left/right column
      - Pulse Feature OVERALL defaults to left/right column
      - Featured Product OVERALL defaults to left/right column

      - Upcoming events individual
        + title
        + date
        + location
        + description

      - Upcoming events individual
        + title
        + date
        + location
        + description

  type_homepage_upcomingEvents_
    header
    title
    date
    location
    description

  ---------------------------------------------------------------------------*/

var app = window.myApp;

app.createOptionsObj = function (tablePrefix, tableNameArray, namePrefix, nameMainArray) {
  var obj = {};

  // overall, event name, event date, event location, event description
  obj.tablePrefix = tablePrefix;
  obj.tableName = tableNameArray;
  obj.tableHeader = [];
  for (var i = 0; i < obj.tableName.length; i++) {
    obj.tableHeader.push(obj.tablePrefix + obj.tableName[i]);
  }

  obj.namePrefix = namePrefix;
  obj.nameMain = nameMainArray
  obj.nameBase = [];
  for (var i = 0; i < obj.nameMain.length; i++) {
    obj.nameBase.push(obj.namePrefix + obj.nameMain[i] + "_");
  }

  return obj;
};

app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend('Homepage Typography Options'));
  app.createSmall("Font sizes are in percentages, 1em is the same as 100% which defaults to 16px, 2.5em is 250% of 16px, so 40px. Also note, most of the values entered below are optional, there are default sizes, colors, and styles for all fonts, so you do not HAVE to enter a value.", fieldset);

  var sectionArray = [];

  /*---------------------------------------------------------------------------
    Slideshow
  ---------------------------------------------------------------------------*/
  var tablePrefix = "Carousel / Slideshow: ";
  var tableName = [
    "Caption Header",
    "Caption",
  ];

  var namePrefix = "type_homepage_slideshow_";
  var nameMain = [
    "header",
    "text",
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    Upcoming Events 
  ---------------------------------------------------------------------------*/
  // overall, event name, event date, event location, event description
  var tablePrefix = "Upcoming Events: ";
  var tableName = [
    "Section Header",
    "Event Title",
    "Event Date",
    "Event Location",
    "Event Description"
  ];

  var namePrefix = "type_homepage_upcomingEvents_";
  var nameMain = [
    "header",
    "title",
    "date",
    "location",
    "description"
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    Featured Products 
  ---------------------------------------------------------------------------*/
  var tablePrefix = "Featured Products: ";
  var tableName = [
    "Section Header",
    "Item Name"
  ];

  var namePrefix = "type_homepage_featuredProducts_";
  var nameMain = [
    "header",
    "title",
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    Contact Us 
  ---------------------------------------------------------------------------*/
  var tablePrefix = "Contact Us: ";
  var tableName = [
    "Section Header",
  ];

  var namePrefix = "type_homepage_contactUs_";
  var nameMain = [
    "header",
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    Pulse Feature 
  ---------------------------------------------------------------------------*/
  var tablePrefix = "Pulse Feature: ";
  var tableName = [
    "Section Header",
  ];

  var namePrefix = "type_homepage_pulseFeature_";
  var nameMain = [
    "header",
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    HTML GENERATOR
      family
      size
  ---------------------------------------------------------------------------*/

  for (var i = 0; i < sectionArray.length; i++) {
    var obj = sectionArray[i];

    for (var j = 0; j < obj.tableName.length; j++) {
      var table = app.createTable();
      var header = obj.tableHeader[j];
      var base = obj.nameBase[j];
      var label = obj.tableName[j];

      // default header table
      var sectionHeader = app.createHeader(header);

      // Upcoming events overall section header defaults
      var defaultSecBase = base;

      // select default Upcoming events overall section header font
      var fontFamily = app.createTableRow(
          // forValueID, innerText, parent
          app.createLabel(defaultSecBase + 'fontFamily', label + " font-family, enter exactly as specificed in google (capitalize if necessary)"),

          // type, name, forValueID
          app.createInput('text', defaultSecBase + 'fontFamily', defaultSecBase + 'fontFamily')
        );
      table.appendChild(fontFamily);

      // select default Upcoming events overall section header size
      var fontSize = app.createTableRow(
        // forValueID, innerText, parent
        app.createLabel(defaultSecBase + 'fontSize', label + " font size, enter number starting from 0.1em (if no value is entered, the default is current view on the web)"),

        // type, name, forValueID
        app.createInput('text', defaultSecBase + 'fontSize', defaultSecBase + 'fontSize')
      );
      table.appendChild(fontSize);
      app.createSmall("The unit 'em' is responsive for mobile and desktop. So input your font-sizes as 1em, 2.2em, etc.")

      // select default Upcoming events overall section header color
      var fontColor = app.createTableRow(
        // forValueID, innerText, parent
        app.createLabel(defaultSecBase + 'color', label + " color"),

        // type, name, forValueID
        app.createInput('text', defaultSecBase + 'color', defaultSecBase + 'color', {'class': 'color'})
      );
      table.appendChild(fontColor);

      // select font-weight (text input: light, normal, bold, 300, etc. ) 
      // DEFAULT is 400/Normal
      var fontWeight = app.createTableRow(
          app.createLabel(defaultSecBase + 'weight', label + " weight (defaults to normal or 400 if not specified) "),
          app.createInput('text', defaultSecBase + 'weight', defaultSecBase + 'weight')
        );
      table.appendChild(fontWeight);
      var small = app.createSmall("Using 'Lato' family as an example, weight options are: thin, light, normal, bold, etc. or their respective numbers (100, 300, 400...so on)", table);

      // select font-style (text input: italicized, oblique)
      // DEFAULT is normal
      var fontStyle = app.createTableRow(
          app.createLabel(defaultSecBase + 'style', label + " style (defaults to normal if not specified) "),
          app.createInput('text', defaultSecBase + 'style', defaultSecBase + 'style')
        );
      table.appendChild(fontStyle);
      var small = app.createSmall("Using 'Lato' family as an example, style options are: italic or oblique ", table);

      // APPEND Upcoming events overall section header TO FIELDSET
      fieldset.appendChild(sectionHeader);
      fieldset.appendChild(table);

    } // end of inner forloop
  } // end of overall forloop

  // RETURN
  return fieldset;
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  app.jsonInit();
});