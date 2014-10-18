/*
Sponsors page. 

Sponsors: Sponsorship Level and Typography 
Specify level, and order of appearance, up to 6 levels. Enter text exactly as you want it to appear on the page

Level 1 (highest on the webpage): Platinum
Level 1 text (optional, will be shown as a blurb explaining the title)
Level 1 (color)

Level 6 (lowest on the webpage): Gold



Typography fontOptions
  Page Header
  Page Blurb
  Sponsorship Level Header
  Sponsorship Level blurb 
  Sponsor name 
  Sponsored event 
  Sponsor blurb 


Sponsors: Individual Sponsor Information
Smalltext: Blurb is optional. 
20 Sponsors
  Sponsor name:
  Sponsored events: 
  Sponsor level (enter EXACTLY as above): 
  Sponsor blurb: 
  Sponsor Logo/Image Upload: 
  Sponsor Logo/Image URL: 

*/

var app = window.myApp;
app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend("Sponsors: Individual Sponsor Information"));

  // SMALL TEXT

  // LEVELS
  var options = 6;
  app.createHeader("Sponsorship Levels", fieldset);
  app.createSmall("Please enter sponsorship levels exactly as you want them to show up. The blurb and color fields are optional.", fieldset);
  
  for (var i = 0; i < options; i++) {
    var table = app.createTable(fieldset);
    var base = "sponsor_level_" + i + "_";
    app.createHeader("Sponsorship Level " + (i+1), table);

    // name
    var label = {
      id: base + 'title',
      text: 'Sponsorship level title'
    };
    var input = {
      id: base + 'title',
      type: 'text'
    };
    app.createTableRow(
      app.createLabel(label),
      app.createInput(input),
      table
    );

    // blurb (optional)
    var label = {
      id: base + 'blurb',
      text: 'Description / blurb'
    };

    var input = {
      id: base + 'blurb',
      type: 'text'
    };

    app.createTableRow(
      app.createLabel(label),
      app.createInput(input),
      table
    );

    // color (optional)
    var label = {
      id: base + 'color',
      text: 'Associated color'
    };

    var input = {
      id: base + 'color',
      type: 'text',
      attr: {
        'class': 'color'
      }
    };

    app.createTableRow(
      app.createLabel(label),
      app.createInput(input),
      table
    );

  }

  // SPONSORS
  /*
    sponsor_i_
      name
      level
      events
      blurb
      logo
      logo_link
  */
  app.createHeader("Individual Sponsor Information", fieldset);
  app.createTableRow(app.createSmall("For sponsorship levels, please enter text EXACTLY the same as above, i.e. if a sponorship level is captialized above or with different punctuations, then enter the same below!"), fieldset);
  app.createTableRow(app.createSmall(" Please start image URLs with '//www.' , 'http://www.' , or 'https://www.'"), fieldset);

  // repeat same fields for mutliple sponsors
  var options = 20;
  for (var i = 0; i < options; i++) {
    var table = app.createTable(fieldset);
    var base = "sponsor_" + i + "_";
    var order = [];

    // Label: 
    //  forValueID, innerText, parent

    // header
    app.createHeader('Sponsor #' + (i+1), table);

    // Sponsor name
    var label = { 
      id: base + "name",
      text: "Sponsor name",
    };
    
    var input = {
      id: base + "name",
      type: 'text'
    }

    app.createTableRow(
      app.createLabel(label),
      app.createInput(input),
      table
    );

    // Sponsor level
    var label = {
      id: base + 'level',
      text: "Sponsorship level"
    };

    var input = {
      id: base + 'level',
      type: 'text'
    };

    app.createTableRow(
      app.createLabel(label),
      app.createInput(input),
      table
    );

    // Sponsor events
    var label = {
      id: base + "events",
      text: "Sponsored events",
    };

    var input = {
      id: base + "events",
      type: 'text',
    };

    app.createTableRow(
      app.createLabel(label),
      app.createInput(input),
      table
    );


    // Sponsor blurb
    var label = {
      id: base + 'blurb',
      text: "Sponsor description/blurb"
    };
    var input = {
      id: base + 'blurb',
      type: 'text'
    };
    app.createTableRow(
      app.createLabel(label),
      app.createInput(input),
      table
    );

    // Sponsor Logo/Image Upload
    var label = {
      id: base + 'logo',
      text: "Sponsor logo/image local file upload"
    };

    var upload = {
      id: base + 'logo',
      width: 500,
      height: 500
    };

    app.createTableRow(
      app.createLabel(label),
      app.createFileUpload(upload),
      table
    );

    // Sponsor Logo/Image URL
    var label = {
      id: base + 'logo_link',
      text: 'Sponsor logo/image URL (this file will take precedence over local file)'
    };

    var input = {
      id: base + 'logo_link',
      type: 'text'
    }

    app.createTableRow(
      app.createLabel(label),
      app.createInput(input),
      table
    );

  }

  // FIELDSET
  return fieldset
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  app.jsonInit();
});
