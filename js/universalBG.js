/* Create a BACKGROUND upload testing page:

- LEGEND - All Pages Default Background
- Header - H3
- Use picture 0 - checkbox
- Input picture - input file upload

*/

/*
  ONE LEGEND
  ONE h3 before every table
    - MULTIPLE tables
    - MULTIPLE ROWS
    - 1-2 data bale


  example: 
  <legend>Header</legend>
  <h3>Logo Options</h3>
  <table>
    <tr>
      <td><label for="use_logo">Use Custom Logo?</label></td>
      <td><input type="checkbox" id="use_logo" name="use_logo" /></td>
    </tr>
    <tr>
      <td><label for="logo_image">Custom Logo</label></td>
      <td><input type="file" name="logo.png" id="logo_image" data-max-width="1200" data-max-height="1200" /></td>
    </tr>
    <tr>
      <td colspan="2"><small>Recommend the optimal width and height for your logo here.</small></td>
    </tr>
  </table>
*/



// *************************************************************************************
// *************************************************************************************
// *************************************************************************************

/*
- checkbox display this event
- checkbox dipslay live link
  + live link
- Event title
- Event date
  + range?
- Event description
- Event Location
- YEAR: RC / EC

*/

app.createSettingsHTML = function () {
	var fieldset = document.createElement('fieldset');
	fieldset.appendChild(app.createLegend('All pages default background'));

	var options = 15;
	for (var i = 0; i < options; i++) {
		// creating DOM elements
		var string = 'default_background_' + i + '_';
		var header = app.createHeader('Background #' + (i+1));
		var table = app.createTable();

		// Event Use checkbox
		var displayEventCheckbox = app.createTableRow(
			  // label: forValueID, innerText, parent
			  app.createLabel(string + 'display_checkbox', 'Display Background #' + (i+1) + '?'),
			  // checkinput: type, name, forValueID 
			  app.createInput('checkbox', string + 'display', string + 'display_checkbox')
			);
		table.appendChild(displayEventCheckbox);

	  // Event title input
		var eventTitle = app.createTableRow(
			  app.createLabel(string + 'title_input', 'Background name: '),
			  app.createInput('text', string + 'title', string + 'title_input')
			);
		table.appendChild(eventTitle);

		// Event picture
		var eventPicture = app.createTableRow(
			  app.createLabel(string + 'picture_upload', 'Background picture: '),
			  // name, forvalueid, maxwidth, maxheight
			  app.createFileUpload(string + 'picture.png', string + 'picture_upload', 600, 600)
			);
		table.appendChild(eventPicture);

	  // append table to DOM
		fieldset.appendChild(header);
		fieldset.appendChild(table);
	}
	document.body.appendChild(fieldset);
};

app.createSettingsHTML();
