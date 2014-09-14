/*
  This is just for the header and blurb that is on the products/individual-product page (vertical_menu.liquid).
  The reason this is not a page is because page is not a globally accessible object on the Shopify network.

  Typography is already taken care of, this just requires two input fields, both optional:
  - Header
  - Blurb  
*/

var app = window.myApp;

app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend('Products / Collections Content');
  app.createSmall("The content here will show up on the products page and the individual-product page as a HBS blurb", fieldset);
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  app.jsonInit();
});
