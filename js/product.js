/*

  PRODUCT
    - product name
    - product vendor
    - price
    - price comparison
    - add to cart

  TAB
    - tab header
    - tab info
*/

var app = window.myApp;

app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend("Product Purchase Page - Typography"));
  app.createSmall("This page's Left Frame font styling inherits from the settings in 'Products / Collections Typography'", fieldset);
  var sectionArray = [];

  /*---------------------------------------------------------------------------
    PRODUCT INFO
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  var tablePrefix = "Product Right Info: ";
  var tableName = [
    "Name",
    "Vendor",
    "Price",
    "Price Comparison",
    "Add To Cart Button"
  ];

  var namePrefix = "product_info_";
  var nameMain = [
    "name",
    "vendor",
    "price",
    "price_compare",
    "addToCart"
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    TAB INFO
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  var tablePrefix = "Product Tab: ";
  var tableName = [
    "Header",
    "Content"
  ];

  var namePrefix = "product_tab_";
  var nameMain = [
    "header",
    "text",
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