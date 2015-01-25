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
  var tablePrefix, tableName, namePrefix, nameMain;

  /*---------------------------------------------------------------------------
    PRODUCT INFO
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  tablePrefix = "Product Right Info: ";
  tableName = [
    "Name",
    "Vendor",
    "Price",
    "Price Comparison",
    "Add To Cart Button"
  ];

  namePrefix = "product_info_";
  nameMain = [
    "name",
    "vendor",
    "price",
    "price_compare",
    "addToCart"
  ];

  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    EXTRA Line-item and Options
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  tablePrefix = "Product Extras: ";
  tableName = [
    "User Input",
    "Notes"
  ];

  namePrefix = "product_extras_";
  nameMain = [
    "input",
    "note",
  ];
  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    Product Variant
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  tablePrefix = "Product Variant: ";
  tableName = [
    "Style Name",
    "Style Options"
  ];

  namePrefix = "product_variant_";
  nameMain = [
    "name",
    "options",
  ];
  sectionArray.push(app.createOptionsObj(tablePrefix, tableName, namePrefix, nameMain));

  /*---------------------------------------------------------------------------
    TAB INFO
  ---------------------------------------------------------------------------*/
  // tablePrefix, tableNameArray, namePrefix, nameMainArray
  tablePrefix = "Product Tab: ";
  tableName = [
    "Header",
    "Content"
  ];

  namePrefix = "product_tab_";
  nameMain = [
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