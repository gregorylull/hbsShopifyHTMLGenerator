/*
  Type: 
    // single line
    mission statement

    // pull left

    picture / file or upload

    display navigation links? - checkbox

    extra content

    // single line
    copyright text

    logo picture --> if different than header logo picture
      + upload file
      + url

*/

var app = window.myApp;

app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend('Footer: Content, BG Color, and Typography'));
  app.createSmall("For mission statement, other content, and pictures go to pages/footer and edit the file", fieldset);
  var table = app.createTable();
  fieldset.appendChild(app.createHeader("Footer Content"));

  var base = "footer_";

  // // copyright text
  var copyright = app.createTableRow(
      app.createLabel(base + "copyright", "Copyright text (automatically prefixes this text with a copyright symbol)"),
      app.createInput('text', base + "copyright", base + "copyright")
    );
  table.appendChild(copyright);

  // display footer navigation links?
  var navlinks = app.createTableRow(
      app.createLabel(base + "navlinks", "Display page navigation links in footer? (nav links are set in Dashboard/Navigation/Footer)"),
      app.createInput('checkbox', base + "navlinks", base + 'navlinks' )
    );
  table.appendChild(navlinks);

  // footer logo picture link
  var logoShieldLink = app.createTableRow(
      app.createLabel(base + "logo_shield_link", "Logo shield URL link (optional*, start url with // )"),
      app.createInput('text', base + "logo_shield_link", base + "logo_shield_link")
    );
  table.appendChild(logoShieldLink);
  app.createSmall("*The logo used in the header is the default, any URL link will take precedence over it" ,table);

  // Background Color
  var bgColor = app.createTableRow(
      app.createLabel(base + "bgColor", "Background color, defaults to 'white' (transparent)"),
      app.createInput('text', base + 'bgColor', base + 'bgColor', {'class': 'color'})
    );
  table.appendChild(bgColor);

  // CONTENT TABLE
  fieldset.appendChild(table);

  /*---------------------------------------------------------------------------
    FOOTER TYPOGRAPHY
  ---------------------------------------------------------------------------*/
  var sectionArray = [];

  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  // overall, event name, event date, event location, event description
  var tablePrefix = "Footer Typography: ";
  var tableName = [
    "Copyright Text",
  ];

  var namePrefix = "footer_type_";
  var nameMain = [
    "copyright",
  ];

  // nameMain, array of values means only these
  var options = {
  };

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