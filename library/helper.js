window.myApp = {};
var app = myApp;

/******************************************************************************
  non format related
******************************************************************************/

// read in previous json object to populate fields if there exists one
// input, textarea, select --> value, attr selected="selected"
app.populateWithJSON = function (json, check) {
  if (typeof json === 'string') { json = JSON.parse(json); }
  var inputs = $('input');
  var textarea = $('textarea');
  var select = $('select');

  var data = !check ? json._data : json._settings;

  // populate data and add event listener for input tag: text and checkboxes
  inputs.length > 0 ? app.inputText(inputs, json, data) : "";

  // for textarea
  textarea.length > 0 ? app.inputTextarea(textarea, json, data) : "";

  // for select
  select.length > 0 ? app.inputSelect(select, json, data) : "";

  app.newJSON = json;
  return app.newJSON;
};

app.inputText = function (inputs, json, data) {
  // for input tags: text and checkbox
  inputs.each(function (index) {
    var type = $(this).attr('type');
    var name = $(this).attr('name');
    var jsonValue = data[name] !== undefined ? data[name] : undefined;

    // for text inputs
    if (type === 'text') {
      if (jsonValue !== undefined) { $(this).val(jsonValue); }
      $(this).on('change', function () {
        data[name] = $(this).val();
      });

    // for checkboxes
    } else if ( type === 'checkbox') {
      if (jsonValue !== undefined) { $(this).prop('checked', jsonValue); }
      $(this).on('change', function () {
        data[name] = $(this).prop("checked");
      });
    }

  });
};

app.inputTextarea = function (textarea, json, data) {
  textarea.each(function (index) {
    var name = $(this).attr('name');
    var jsonValue = data[name] !== undefined ? data[name] : undefined;
    if (data[name] !== undefined) { $(this).val(jsonValue); }
    $(this).on('change', function () {
      data[name] = $(this).val();
    });
  });
};

app.inputSelect = function (select, json, data) {
  select.each(function (index) {
    var name = $(this).attr('name');
    var jsonValue = data[name] !== undefined ? data[name] : undefined;
    if (data[name] !== undefined) { 
      $(this).val(jsonValue).children().each(function (index) {
        if ($(this).val() === jsonValue) {
          $(this).attr('selected', true); 
        }
      }); 
    }
    $(this).on('change', function () {
      data[name] = $(this).val();
    });
  });
}

// creates a fixed control panel in the upper right of the screen
app.controlPanel = function () {
  $('<div></div>').attr('id', 'control-panel').css({
    position: 'fixed',
    top: 0,
    right: 0,
    border: "1px solid black",
    display: "100%"
  }).appendTo($('body'));
};

// add a button that console logs the json
app.showJSON = function (json) {
  var div = $('<div>.log new JSON</div>').css({
    display: 'inline-block',
    border: "1px dotted blue",
    "background-color": "rgb(200,200,200)"
  }).appendTo($('#control-panel'));
  div.on('click', function () {
    console.log("new json: \n\n", JSON.stringify(json), "\n\n\n");
    console.log("json Obj: \n\n", json);
  });
};

app.jsonFormatter = function () {
  $('<div><a href="http://jsonviewer.stack.hu/" target="_blank"> json format</a> </div>').css({
    display: 'inline-block',
    border: "1px dotted blue",
    margin: "0px 5px"
  }).appendTo($('#control-panel'));
}

app.xhtmlConverter = function () {
  $('<div><a href="http://www.csgnetwork.com/cvthtml2xhtml.html" target="_blank"> html TO xhtml</a> </div>').css({
    display: 'inline-block',
    border: "1px dotted blue",
    margin: "0px 5px"
  }).appendTo($('#control-panel'));
};

app.xhtmlFormatter = function () {
  $('<div><a href="http://www.freeformatter.com/html-formatter.html" target="_blank"> json format</a> </div>').css({
    display: 'inline-block',
    border: "1px dotted blue",
    margin: "0px 5px"
  }).appendTo($('#control-panel'));
};

app.jsonInit = function (json, check) {
  json = json || myApp.currentJSON;
  var newJson = app.populateWithJSON(json, check);
  app.controlPanel();
  app.showJSON(newJson);
  app.jsonFormatter();
  app.xhtmlConverter();
  app.xhtmlFormatter();
};


/******************************************************************************
  LEGEND AND SMALL
******************************************************************************/

app.createLegend = function (name) {
  var legend = document.createElement('legend');
  legend.innerText = name;
  return legend;
};

app.createHeader = function (name) {
  var header = document.createElement('h3');
  header.innerText = name;
  return header;
};

// returns a <row> element, with a <td  colspan="2"> element, and nests the text into a <small> tag
// if the 'parent' argument is specified, will automatically append this to the parent (which should be a table)
// does not use createRow or createTd because there is a colspan attribute set to 2
app.createSmall = function (text, parent) {
  var small = document.createElement('small');
  small.innerText = text;

  // parent could be a table or a fieldset
  if (parent && parent.nodeName.toLowerCase() === 'fieldset') {
    parent.appendChild(small);
  } else if (parent && parent.nodeName.toLowerCase() === 'table') {
    var td = app.createTableData(small);
    var row = document.createElement('tr');
    row.appendChild(td);
    td.setAttribute('colspan', '2');
    parent.appendChild(row);
  }

  // if no parent is specified, then just return the <small> element
  return small;
};

/******************************************************************************
  TABLE
******************************************************************************/

app.createTable = function(parent, child) {
  var table = document.createElement('table');
  if (parent) {
    parent.appendChild(table);
  }

  if (child) {
    if (Array.isArray(child)) { table.appendChild.apply(null, child); }
    else { table.appendChild(child); }
  }
  return table;
};

// takes an element, like <input> or <label> and wraps it with <td></td>
app.createTableData = function (child) {
  var tableData = document.createElement('td');
  if (child) {
    tableData.appendChild(child);
    return tableData;
  }
  return tableData;
}

// in shopify, a row can only have TWO table cells, so this takes only TWO arguments
app.createTableRow = function () {
  var row = document.createElement('tr');
  if (arguments.length > 0) {
    for (var i = 0; i < arguments.length; i++) {
      var cellData = arguments[i];
      row.appendChild(app.createTableData(cellData));
    }
    return row;
  } else {
    return row;
  }
};

app.createTableHeader = function (child) {
  var rowHeader = document.createElement('th');
  if (child) {
    rowHeader.appendChild(child);
    return rowHeader;
  }
  return rowHeader;
}


/******************************************************************************
  INPUTS
********************************************************************************/

app.createLabel = function (forValueID, innerText, parent) {
  forValueID = forValueID || '';

  var label = document.createElement('label');
  label.setAttribute('for', forValueID);
  label.innerText = innerText;
  if (parent) {
    parent.appendChild(label);
    return label;
  } else {
    return label;
  }
};

app.createInput = function (type, name, forValueID, special) {
  var input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('name', name);
  input.id = forValueID;

  if (special) {
    for (var attr in special) {
      input.setAttribute(attr, special[attr]);
    }
  }

  if (type === 'checkbox') {
    input.setAttribute('value', '1');
  }

  return input;
};

app.createTextArea = function (name, forValueID, cols, rows, value) {
  cols = cols | "55";
  rows = rows | "6";
  value = value | '';

  var textArea = document.createElement('textarea');
  textArea.setAttribute('name', name);
  textArea.setAttribute('cols', cols);
  textArea.setAttribute('rows', rows);
  textArea.setAttribute('value', value);
  textArea.id = forValueID;

  return textArea;
};

app.createFileUpload = function (name, forValueID, maxWidth, maxHeight) {
  maxWidth = maxWidth || 2000;
  maxHeight = maxHeight || 2000;
  var fileInput = document.createElement('input');
  fileInput.setAttribute('name', name);
  fileInput.id = forValueID;
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('data-max-width', maxWidth);
  fileInput.setAttribute('data-max-height', maxHeight);

  return fileInput;
};

app.createSelectDropdown = function (name, forValueID, optionsArray, attr) {
  var select = $('<select></select>').attr({name: name, id: forValueID});
  if (attr) { select.attr(attr); }
  for (var i = 0; i < optionsArray.length; i++) {
    app.createOption(null, optionsArray[i]).appendTo(select);
  }
  return select[0];
};

app.createOption = function (parent, attrObject) {
  var option = $('<option></option>');
  if (parent) { option.appendTo($(parent)); }

  for (var attr in attrObject) {
    var value = attrObject[attr];
    if (attr === 'text') {
      option.text(value);
    } else {
      // value has to be a string if it is part of an attribute!!!
      option.attr(attr, value);
    }
  }

  return option;
};

/******************************************************************************
  TYPOGRAPHY
********************************************************************************/

app.createOptionsObj = function (tablePrefix, tableNameArray, namePrefix, nameMainArray, options) {
  var obj = {};

  // overall, event name, event date, event location, event description
  obj.tablePrefix = tablePrefix;
  obj.tableName = tableNameArray;
  obj.tableHeader = [];
  for (var i = 0; i < obj.tableName.length; i++) {
    obj.tableHeader.push(obj.tablePrefix + obj.tableName[i]);
  }

  obj.namePrefix = namePrefix;
  obj.nameMain = nameMainArray
  obj.nameBase = [];
  for (var i = 0; i < obj.nameMain.length; i++) {
    obj.nameBase.push(obj.namePrefix + obj.nameMain[i] + "_");
  }

  return obj;
};


  app.fontGenerator = function (sectionArray, fieldset) {
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
          app.createLabel(defaultSecBase + 'fontSize', label + " font size, enter number starting from 0.1em (if no value is entered, the default is current view on the web)"),

          // type, name, forValueID
          app.createInput('text', defaultSecBase + 'fontSize', defaultSecBase + 'fontSize')
        );
        table.appendChild(fontSize);
        app.createSmall("The unit 'em' is responsive for mobile and desktop. So input your font-sizes as 1em, 2.2em, etc.")

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
        table.appendChild(fontWeight);
        var small = app.createSmall("Using 'Lato' family as an example, weight options are: thin, light, normal, bold, etc. or their respective numbers (100, 300, 400...so on)", table);

        // select font-style (text input: italicized, oblique)
        // DEFAULT is normal
        var fontStyle = app.createTableRow(
            app.createLabel(defaultSecBase + 'style', label + " style (defaults to normal if not specified) "),
            app.createInput('text', defaultSecBase + 'style', defaultSecBase + 'style')
          );
        table.appendChild(fontStyle);
        var small = app.createSmall("Using 'Lato' family as an example, style options are: italic or oblique ", table);

        // APPEND Upcoming events overall section header TO FIELDSET
        fieldset.appendChild(sectionHeader);
        fieldset.appendChild(table);

      } // end of inner forloop
    } // end of overall forloop
  };

