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


app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend('Homepage Typography Options'));
  var sectionArray = [];

  /*---------------------------------------------------------------------------
    Upcoming Events 
  ---------------------------------------------------------------------------*/
  var obj = {};

  // overall, event name, event date, event location, event description
  obj.tablePrefix = "Upcoming Events: ";
  obj.tableName = [
    "Section Header",
    "Event Title",
    "Event Date",
    "Event Location",
    "Event Description"
  ];
  obj.tableHeader = [];
  for (var i = 0; i < obj.tableName.length; i++) {
    obj.tableHeader.push(obj.tablePrefix + obj.tableName[i]);
  }

  obj.namePrefix = "type_homepage_upcomingEvents_";
  obj.nameMain = [
    "header",
    "title",
    "date",
    "location",
    "description"
  ];
  obj.nameBase = [];
  for (var i = 0; i < obj.nameMain.length; i++) {
    obj.nameBase.push(obj.namePrefix + obj.nameMain[i] + "_");
  }

  sectionArray.push(obj);


  /*---------------------------------------------------------------------------
    HTML GENERATOR
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
        app.createLabel(defaultSecBase + 'fontSize', label + " font size, enter number starting from 0.1 (if no value is entered, the default is current view on the web)"),

        // type, name, forValueID
        app.createInput('text', defaultSecBase + 'fontSize', defaultSecBase + 'fontSize')
      );
      table.appendChild(fontSize);

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
      var small = app.createSmall("Using 'Lato' family as an example, options are: thin, light, normal, bold, etc. or their respective numbers (100, 300, 400...so on). Also note that not all families have options, check google fonts.");
      table.appendChild(fontWeight);
      table.appendChild(small);

      // select font-style (text input: italicized, oblique)
      // DEFAULT is normal
      var fontStyle = app.createTableRow(
          app.createLabel(defaultSecBase + 'style', label + " style (defaults to normal if not specified) "),
          app.createInput('text', defaultSecBase + 'style', defaultSecBase + 'style')
        );
      var small = app.createSmall("Using 'Lato' family as an example, options are: italic. Also note that not all families have the italic option.");
      table.appendChild(fontStyle);
      table.appendChild(small);

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