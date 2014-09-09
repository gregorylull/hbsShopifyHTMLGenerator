/*

  LEFT COLUMN FRAME
    - the individual products page will inherit this frame's settings
    - HBS SA Blurb Header
    - HBS SA Blurb text
    - Collections Menu Header
    - Collections Menu items

  GRID
   - Grid Collection Header
   - Grid current collection
   - Product name
   - Product price
*/

var app = window.myApp;

app.createSettingsHTML = function () {
  var fieldset = document.createElement('fieldset');
  fieldset.appendChild(app.createLegend("Products / Collections Page Typography"));
  app.createSmall("The individual products page (/products/*item) will inherit the Left Frame font settings through here", fieldset);
  var sectionArray = [];

  /*---------------------------------------------------------------------------
    HBS SA BLURB
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  var tablePrefix = "Left Frame - HBS SA Products Blurb: ";
  var tableName = [
    "Header",
    "Description"
  ];

  var namePrefix = "products_frame_blurb_";
  var nameMain = [
    "header",
    "text"
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    COLLECTIONS VERTICAL MENU
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  var tablePrefix = "Left Frame - Collections Menu: ";
  var tableName = [
    "Header",
    "Menu Items"
  ];

  var namePrefix = "products_frame_menu_";
  var nameMain = [
    "header",
    "item",
  ];
  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    PRODUCTS GRID
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  var tablePrefix = "Products Grid: ";
  var tableName = [
    "Header",
    "Header - Currently Displayed",
    "Product Name",
    "Product Price",
    "Product Price Comparison"
  ];

  var namePrefix = "products_grid_";
  var nameMain = [
    "header",
    "header_current",
    "product_name",
    "product_price",
    "product_price_compare"
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