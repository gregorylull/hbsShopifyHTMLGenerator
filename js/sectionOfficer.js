
$(function () {

  // create a table cell
  var createTD = function (text, parent) {
    var td = $('<td></td>').text(text);

    // parent should be a row
    if (parent) { parent.append(td); }

    return td;
  };

  // create a table header
  var createTH = function (text, parent) {
    var th = $('<th></th>').text(text);

    if (parent) { parent.append(th); }

    return th;
  };

  // create a row
  var createRow = function (td, parent) {
    var row = $('<tr></tr>');

    // if td is an array
    if (td) {
      row.append(td);
    }

    if (parent) {
      parent.append(row);
    }

    return row;
  }

  /*****************************************************************************
      actual table construction
  *****************************************************************************/


  var tableHead = $('<thead></thead>');
  var tableBody = $('<tbody></tbody>');
  var table = $('<table></table>').addClass('table table-striped');

  table.append(tableHead).append(tableBody).appendTo($('body'));

  // col groups?
  table.prepend($('<colgroup><col style="background-color: yellow"></colgroup>'));

  // jsonFile

  for (var rowIndex = 0; rowIndex < jsonFile.length; rowIndex++) {
    var row = jsonFile[rowIndex];
    var jqueryRow = createRow();
    for (var colIndex = 0; colIndex < row.length; colIndex++) {
      var cellContent = row[colIndex];
      if (rowIndex === 0) {
        var th = createTH(cellContent, jqueryRow);
      } else {
        var td = createTD(cellContent, jqueryRow);
      }
    }
    if (rowIndex === 0) {
      tableHead.append(jqueryRow);
    } else {
      tableBody.append(jqueryRow);
    }
  }

});
