/*
  This is for general typography
    - pick a default type
    - pick a default size (will be ems)
      + small text: default is 1, in general, do not change this, as it will have cascading effects. 

    H3 using google fonts
    - small, it would be better to include all of google fonts at once, but in case you forget, here are three fields
    - in each field, please copy and paste the Standard link (NOT @import nor Javascript), your link should something look like this: 
<link href='http://fonts.googleapis.com/css?family=...' rel='stylesheet' type='text/css'>
    - 5x blank boxes for extra google fonts (general). copy and paste the entire link, which should be the follow format:
      these styles will be available in all pages and on all elements
    - One more small font note AT THE TOP

    For individual pages
      this will overwrite settings on the general page
    - text size; default is 1 meaning 100%
    - bold (check)
    - italicized (check)
    - color

*/

var app = window.myApp;

app.createSettingsHTML = function () {
  // default vars
  var uploadLimit = 3;

  // tables
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend('Typography General'));

  // small note
  fieldset.appendChild(app.createSmall("Font families uploaded here will be accessible in all pages. Font sizes are in percentages, 1 is the same as 100% which defaults to 16px, 2.5 is 250% of 16px, so 40px. Also note, most of the values entered below are optional, there are default sizes, colors, and styles for all fonts, so you do not HAVE to enter a value."));

  /*---------------------------------------------------------------------------
    UPLOAD GOOGLE FONTS
  ---------------------------------------------------------------------------*/

  // upload google font links
  var tableGoogleFont = app.createTable();
  var fontLinkBase = 'googleFontLink_';
  var header = app.createHeader('Google Fonts');
  for (var i = 0; i < uploadLimit; i++) {
    var googleFontLink = app.createTableRow(
        app.createLabel(fontLinkBase + i, "Google fonts link, copy and paste the 'Standard' into here"), // forValueID, innerText, parent
        app.createInput('text', fontLinkBase + i, fontLinkBase + i)  // type, name, forValueID
      );

    tableGoogleFont.appendChild(googleFontLink);
  }
  fieldset.appendChild(header);
  var small = app.createSmall("Please copy and paste the Standard link (NOT @import nor Javascript), the link should look like this: ", fieldset); 
  var small2 = app.createSmall("<link href='http://fonts.googleapis.com/css?family=...' rel='stylesheet' type='text/css'>", fieldset);
  fieldset.appendChild(tableGoogleFont);

  /*---------------------------------------------------------------------------
    DEFAULT HEADER font options
  ---------------------------------------------------------------------------*/

  // default header table
  var defaultHeaderTable = app.createTable();
  var defaultSecBaseHeader = app.createHeader("Default Section Header Options");

  // section header defaults
  var defaultSecBase = "type_default_sectionHeader_";

  // select default section header font
  var sectionHeaderFamily = app.createTableRow(
      // forValueID, innerText, parent
      app.createLabel(defaultSecBase + 'fontFamily', "Section header font-family, enter exactly as specificed in google (capitalize if necessary)"),

      // type, name, forValueID
      app.createInput('text', defaultSecBase + 'fontFamily', defaultSecBase + 'fontFamily')
    );
  defaultHeaderTable.appendChild(sectionHeaderFamily);

/*
// changing universal header size does not seem appropriate
  // select default section header size
  var sectionHeaderSize = app.createTableRow(
    // forValueID, innerText, parent
    app.createLabel(defaultSecBase + 'font-size', "Section header font size, enter number starting from 0.1 (if no value is entered, the default is current view on the web)"),

    // type, name, forValueID
    app.createInput('text', defaultSecBase + 'font-size', defaultSecBase + 'font-size')
  );
  defaultHeaderTable.appendChild(sectionHeaderSize);
*/

  // select default section header color
  var sectionHeaderColor = app.createTableRow(
    // forValueID, innerText, parent
    app.createLabel(defaultSecBase + 'color', "Section header color"),

    // type, name, forValueID
    app.createInput('text', defaultSecBase + 'color', defaultSecBase + 'color', {'class': 'color'})
  );
  defaultHeaderTable.appendChild(sectionHeaderColor);

  // select font-weight (text input: light, normal, bold, 300, etc. ) 
  // DEFAULT is 400/Normal
  var sectionHeaderWeight = app.createTableRow(
      app.createLabel(defaultSecBase + 'weight', "Section header weight (defaults to normal or 400 if not specified) "),
      app.createInput('text', defaultSecBase + 'weight', defaultSecBase + 'weight')
    );
  defaultHeaderTable.appendChild(sectionHeaderWeight);
  var small = app.createSmall("Using 'Lato' family as an example, options are: thin, light, normal, bold, etc. or their respective numbers (100, 300, 400...so on). Also note that not all families have options, check google fonts.", defaultHeaderTable);

  // select font-style (text input: italicized, oblique)
  // DEFAULT is normal
  var sectionHeaderStyle = app.createTableRow(
      app.createLabel(defaultSecBase + 'style', "Section header style (defaults to normal if not specified) "),
      app.createInput('text', defaultSecBase + 'style', defaultSecBase + 'style')
    );
  defaultHeaderTable.appendChild(sectionHeaderStyle);
  var small = app.createSmall("Using 'Lato' family as an example, options are: italic. Also note that not all families have the italic option.", defaultHeaderTable);

  // APPEND SECTION HEADER TO FIELDSET
  fieldset.appendChild(defaultSecBaseHeader);
  fieldset.appendChild(defaultHeaderTable);

  /*---------------------------------------------------------------------------
    DEFAULT PAGE/BODY font options
  ---------------------------------------------------------------------------*/

  // default page/body font options
  var defaultPageFont = "type_default_page_";
  var defaultPageFontHeader = app.createHeader("Default Page Font Options");
  var defaultPageTable = app.createTable();

  // select default section block font
  var defaultPageFamily = app.createTableRow(
      // forValueID, innerText, parent
      app.createLabel(defaultPageFont + 'fontFamily', "Page font-family, enter exactly as specificed in google (capitalize if necessary)"),

      // type, name, forValueID
      app.createInput('text', defaultPageFont + 'fontFamily', defaultPageFont + 'fontFamily')
    );
  defaultPageTable.appendChild(defaultPageFamily);

/*
  // does not make sense to set all fonts for all pages
  // select default section block size
  var defaultPageSize = app.createTableRow(
    // forValueID, innerText, parent
    app.createLabel(defaultPageFont + 'fontSize', "Page font size, enter number starting from 0.1 (if no value is entered, the default is current view on the web)"),

    // type, name, forValueID
    app.createInput('text', defaultPageFont + 'fontSize', defaultPageFont + 'fontSize')
  );
  defaultPageTable.appendChild(defaultPageSize);
*/

  // select default section block color
  var defaultPageColor = app.createTableRow(
    // forValueID, innerText, parent
    app.createLabel(defaultPageFont + 'color', "Page color"),

    // type, name, forValueID
    app.createInput('text', defaultPageFont + 'color', defaultPageFont + 'color', {'class': 'color'})
  );
  defaultPageTable.appendChild(defaultPageColor);

  // select font-weight (text input: light, normal, bold, 300, etc. ) 
  // DEFAULT is 400/Normal
  var defaultPageWeight = app.createTableRow(
      app.createLabel(defaultPageFont + 'weight', "Page font weight (defaults to normal or 400 if not specified) "),
      app.createInput('text', defaultPageFont + 'weight', defaultPageFont + 'weight')
    );
  defaultPageTable.appendChild(defaultPageWeight);
  var small = app.createSmall("Using 'Lato' family as an example, options are: thin, light, normal, bold, etc. or their respective numbers (100, 300, 400...so on). Also note that not all families have options, check google fonts.", defaultPageTable);

  // select font-style (text input: italicized, oblique)
  // DEFAULT is normal
  var defaultPageStyle = app.createTableRow(
      app.createLabel(defaultPageFont + 'style', "Page font style (defaults to normal if not specified) "),
      app.createInput('text', defaultPageFont + 'style', defaultPageFont + 'style')
    );
  defaultPageTable.appendChild(defaultPageStyle);
  var small = app.createSmall("Using 'Lato' family as an example, options are: italic. Also note that not all families have the italic option.", defaultPageTable);

  // APPEND DEFAULT BODY/PAGE TO FIELDSET
  fieldset.appendChild(defaultPageFontHeader);
  fieldset.appendChild(defaultPageTable);


  /*---------------------------------------------------------------------------
    ABOUT US PAGE font options
  ---------------------------------------------------------------------------*/

  /*---------------------------------------------------------------------------
    EVENTS PAGE font options
  ---------------------------------------------------------------------------*/

  /*---------------------------------------------------------------------------
    PRODUCTS PAGE font options
  ---------------------------------------------------------------------------*/


  // for appending to body
  return fieldset;
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  app.jsonInit();
});

