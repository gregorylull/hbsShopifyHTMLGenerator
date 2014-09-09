/*

  HOMEPAGE SETTINGS 

  - heading
  - slideshow, up to 6 pictures
    + use picture - checkbox
    + use upload file - fileupload
    + use URL - input text
    + pictures can be navigation
    + pictures can be links
    + caption HEADER
    + caption content

*/

var app = window.myApp;

app.createSettingsHTML = function () {
  var options = 6;
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend("Homepage Content Settings"));

  // interval speed
  var header = app.createHeader("Slide Show Pictures");
  fieldset.appendChild(header);
  var table = app.createTable();
  app.createSmall("Slide show pictures should generally have a width:height aspect ratio of 3:1. ALL pictures MUST have the same exact aspect ratio", fieldset);

  var slideInterval = app.createTableRow(
      app.createLabel("homepage_slideshow_interval", "Slideshow interval speed (milliseconds, defaults to 4000 ms)"),
      app.createInput('text', "homepage_slideshow_interval", "homepage_slideshow_interval")
    );
  table.appendChild(slideInterval);
  app.createSmall("If your input is 3500, that means every 3.5 seconds the next slide will appear. There is an initial delay because picture are still loading", table);
  fieldset.appendChild(table);

  // slide show pictures
  var base = "homepage_slideshow_pic_";
  var suffix = ".png";

  for (var i = 0; i < options; i++) {
    var table = app.createTable();
    table.appendChild(app.createHeader("Slide Show Picture " + (i+1)));
    var name = base + i;
    var nameURL = base + i + "_link";

    // display checkbox
    var slideDisplay = app.createTableRow(
        app.createLabel(name + "_display", 'Display picture #' + (i+1) + " ?"),
        // type, name, forValueID, special
        app.createInput('checkbox', name + "_display", name + "_display")
      );
    table.appendChild(slideDisplay);

    // slideshow file upload
    var slidePicture = app.createTableRow(
        app.createLabel(name + "_upload", 'Slideshow picture file upload: '),
        // name, forvalueid, maxwidth, maxheight
        app.createFileUpload(name + ".png", name + "_upload", 1800, 1800)
      );
    table.appendChild(slidePicture);

    // picture URL
    var slideDisplay = app.createTableRow(
        app.createLabel(nameURL, "Slideshow picture URL (if there isn't a local file)" ),
        // type, name, forValueID, special
        app.createInput('text', nameURL, nameURL)
      );
    table.appendChild(slideDisplay);
    app.createSmall("Picture URLs take precedence over locally upload pictures", table);

    // picture caption header
    var slideCaptionHeader = app.createTableRow(
        app.createLabel(name + "_captionHeader", "Slideshow picture caption header (optional)" ),
        // type, name, forValueID, special
        app.createInput('text', name + "_captionHeader", name + "_captionHeader")
      );
    table.appendChild(slideCaptionHeader);

    // picture caption
    var slideCaption = app.createTableRow(
        app.createLabel(name + "_caption", "Slideshow picture caption (optional)" ),
        // type, name, forValueID, special
        app.createInput('text', name + "_caption", name + "_caption")
      );
    table.appendChild(slideCaption);

    // picture URL link
    var slideLinkURL = app.createTableRow(
        app.createLabel(name + "_urlLink", "Slideshow picture can link to another website (optional)" ),
        // type, name, forValueID, special
        app.createInput('text', name + "_urlLink", name + "_urlLink")
      );
    table.appendChild(slideLinkURL);
    app.createSmall("For navigation links to another page on this site, copy the last portion of the URL after the '.com'. For example, click on the About Us page, you will see '/pages/about-us', copy it here without quotes", table);

    // FIELDSET
    fieldset.appendChild(table);
  }


  return fieldset
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  app.jsonInit();
});