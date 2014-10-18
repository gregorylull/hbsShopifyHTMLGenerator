/* Create a events page:

- checkbox display this event
- YEAR: RC / EC
- Event title
- Event date
  + range?
- Event description
- Event Location
- Event Location link (optional)
- checkbox dipslay live link
  + live link

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

	var options = 20;
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

    // Display on front page (upcoming events)
    var displayOnFP = app.createTableRow(
      app.createLabel(string + "display_frontpage", "Display on homepage under 'Upcoming Event'?"),
      app.createInput('checkbox', string + "display_frontpage", string + "display_checkbox")
    );

    table.appendChild(displayOnFP);

    // Event cohort select
    var cohortOptions = [
      {text: 'RC', value: 'RC'},
      {text: 'EC', value: 'EC'},
      {text: 'both', value: 'both'},
      {text: 'N/A', value: 'N/A'},
    ];

    var eventCohortSelect = app.createTableRow(
        app.createLabel(string + 'cohort_select', 'Select class year'),
        app.createSelectDropdown(string + 'cohort', string + 'corhort_select', cohortOptions) // name, forValueID, optionsArray
      );
    table.appendChild(eventCohortSelect);

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

    // Event location - text input
    var eventLocation = app.createTableRow(
        app.createLabel(string + 'location_input', 'Event location: '),
        app.createInput('text', string + 'location', string + 'location_input')
      );
    table.appendChild(eventLocation);

    // event location link - optional text input
    var eventLocationLink = app.createTableRow(
        app.createLabel(string + 'location_link_input', 'Event location link/map (optional): '),
        app.createInput('text', string + 'location_link', string + 'location_link_input')
      );
    table.appendChild(eventLocationLink);

		// Event description
		var eventDescription = app.createTableRow(
			  app.createLabel(string + 'description_textarea', 'Event description (max ~180 characters): '),

			  // Text area: name, forValueID, [,col] [,row] [,value]
			  app.createTextArea(string + 'description', string + 'description_textarea')
			);
		table.appendChild(eventDescription);

		// Event picture
		var eventPicture = app.createTableRow(
			  app.createLabel(string + 'picture_upload', 'Event picture (height:width must be 1:1): '),
			  // name, forvalueid, maxwidth, maxheight
			  app.createFileUpload(string + 'picture.png', string + 'picture_upload', 600, 600)
			);
		table.appendChild(eventPicture);

    // Event picture URL
    var eventPictureURL = app.createTableRow(
        app.createLabel(string + 'picture_link', 'Event picture URL if there is no local file (URL MUST begin with // or http:// or https:// ): '),
        // name, forvalueid, maxwidth, maxheight
        app.createInput('text', string + 'picture_link', string + 'picture_link')
      );
    table.appendChild(eventPictureURL);
    app.createSmall("A url link will take precedence over a local file", table);

		// Live RSVP link
		var eventRSVP = app.createTableRow(
			  app.createLabel(string + 'rsvp_input', 'Event RSVP link: '),
			  app.createInput('text', string + 'rsvp', string + 'rsvp_input')
			);
		table.appendChild(eventRSVP);

		// Is event live checkbox
		var eventLiveCheckbox = app.createTableRow(
			  app.createLabel(string + 'rsvp_live', 'Display RSVP link (is event RSVP live)?: '),
			  app.createInput('checkbox', string + 'rsvp_display', string + 'rsvp_live')
			)
		table.appendChild(eventLiveCheckbox);

	  // append table to DOM
		fieldset.appendChild(header);
		fieldset.appendChild(table);

	}
  return fieldset;
};

$(function () {
  document.body.appendChild(app.createSettingsHTML());
  // populate fields with data
  app.jsonInit();
});

