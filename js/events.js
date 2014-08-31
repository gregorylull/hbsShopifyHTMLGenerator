/* Create a events page:

- checkbox display this event
- checkbox dipslay live link
  + live link
- Event title
- Event date
  + range?
- Event description
- Event Location
- YEAR: RC / EC

create a legend
create a header

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
	fieldset.appendChild(app.createLegend('Events page'));

	var options = 15;
	for (var i = 0; i < options; i++) {
		// creating DOM elements
		var string = 'eventspage_' + i + '_';
		var header = app.createHeader('Event #' + (i+1));
		var table = app.createTable();

		// Event Use checkbox
		var displayEventCheckbox = app.createTableRow(
			  // label: forValueID, innerText, parent
			  app.createLabel(string + 'display_checkbox', 'Display Event #' + (i+1) + '?'),
			  // checkinput: type, name, forValueID 
			  app.createInput('checkbox', string + 'display', string + 'display_checkbox')
			);
		table.appendChild(displayEventCheckbox);

	  // Event title input
		var eventTitle = app.createTableRow(
			  app.createLabel(string + 'title_input', 'Event name: '),
				app.createInput('text', string + 'title', string + 'title_input')
			);
		table.appendChild(eventTitle);

		// Event date
		var eventDate = app.createTableRow(
			  app.createLabel(string + 'date_input', 'Event date: '),
			  app.createInput('text', string + 'date', string + 'date_input')
			);

		table.appendChild(eventDate);

		// Event description
		var eventDescription = app.createTableRow(
			  app.createLabel(string + 'description_textarea', 'Event description (~220 characters): '),

			  // Text area: name, forValueID, [,col] [,row] [,value]
			  app.createTextArea(string + 'description', string + 'description_textarea')
			);
		table.appendChild(eventDescription);

		// Event picture
		var eventPicture = app.createTableRow(
			  app.createLabel(string + 'picture_upload', 'Event picture (aspect ratio must be 1:1): '),
			  // name, forvalueid, maxwidth, maxheight
			  app.createFileUpload(string + 'picture.png', string + 'picture_upload', 600, 600)
			);
		table.appendChild(eventPicture);

		// Live RSVP link
		var eventRSVP = app.createTableRow(
			  app.createLabel(string + 'rsvp_input', 'Event RSVP link: '),
			  app.createInput('text', string + 'rsvp', string + 'rsvp_input')
			);
		table.appendChild(eventRSVP);

		// Is event live checkbox
		var eventLiveCheckbox = app.createTableRow(
			  app.createLabel(string + 'rsvp_live', 'Display RSVP link (is link live)?: '),
			  app.createInput('checkbox', string + 'rsvp_display', string + 'rsvp_live')
			)
		table.appendChild(eventLiveCheckbox);

	  // append table to DOM
		fieldset.appendChild(header);
		fieldset.appendChild(table);
	}
	document.body.appendChild(fieldset);
};

app.createSettingsHTML();
