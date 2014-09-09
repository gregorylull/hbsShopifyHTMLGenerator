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

  app.fontGenerator(sectionArray, fieldset);

  // RETURN
  return fieldset;
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  app.jsonInit();
});