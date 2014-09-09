/*
  EXAMPLE: 

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
Legend: About Us: Executive Team Profiles

Exec team header
Exec team header color
Exec team color 
Exec team description font-family (comma separated)

Exec team description
Exec team description color 
Exec team description font-family (comma separated)
Exec team description font-size ()


Member 1
  Use this profile - checkbox
  Name - input
  Team position - input
  About yourself - text area
  Email - text input
  Picture - file upload

*/

var app = window.myApp;

app.createSettingsHTML = function () {
	var maxMembers = 15;
	var base = 'aboutus_execprofile_';
	var fieldset = document.createElement('fieldset');
	fieldset.appendChild(app.createLegend('About Us: Executive Team Profiles'));
/*  
  // input field for organizing about us layout
  fieldset.appendChild(app.createHeader('Exec Team Profile Layout'));
  var layoutTable = app.createTable();
  var profileLayout = app.createTableRow(
  	  app.createLabel(base + 'row_sequence', 'Specifiy how many profiles per row (comma separated). If empty, the default* will be used.'),
  	  app.createInput('text', base + 'row_sequence', base + 'row_sequence')
  	);
  layoutTable.appendChild(profileLayout);
  fieldset.appendChild(layoutTable);
  app.createSmall('*default layout for 2 co-presidents and 11 other members is: 2,4,3,4', layoutTable);

  // checkbox option for ordering alphabetically or according to the ordering below
  // forValueID, innerText [,parent]
  var orderAlpha = app.createTableRow(
      app.createLabel(base + "display_alphabetical", "Check this to display profiles in the order entered below (default is alphabetical)"),
      app.createInput('checkbox', base + 'display_alphabetical', base + 'display_alphabetical')       // type, name, forValueID
    );
  layoutTable.appendChild(orderAlpha);
*/
  // input fields for exec team members
	for (var i = 0; i < maxMembers; i++) {
		// creating DOM elements
		var string = base + i + '_';
		var header = app.createHeader('Member #' + (i+1));
		var table = app.createTable();

		// Use exec team profile checkbox
		var displayProfileCheckbox = app.createTableRow(
			  // label: forValueID, innerText, parent
			  app.createLabel(string + 'display_checkbox', 'Display member #' + (i+1) + '?'),
			  // checkinput: type, name, forValueID 
			  app.createInput('checkbox', string + 'display', string + 'display_checkbox')
			);
		table.appendChild(displayProfileCheckbox);

  	    // Member name 
		var memberName = app.createTableRow(
			  app.createLabel(string + 'name_input', 'Name (first, last): '),
				app.createInput('text', string + 'name', string + 'name_input')
			);
		table.appendChild(memberName);

		// Team position
		var memberPosition = app.createTableRow(
			  app.createLabel(string + 'position_input', 'Position (e.g. Co-President): '),
			  app.createInput('text', string + 'position', string + 'position_input')
			);

		table.appendChild(memberPosition);

		// About yourself
		var memberAboutYourself = app.createTableRow(
			  app.createLabel(string + 'description_textarea', 'About yourself (~220 characters): '),

			  // Text area: name, forValueID, [,col] [,row] [,value]
			  app.createTextArea(string + 'description', string + 'description_textarea')
			);
		table.appendChild(memberAboutYourself);

		// Profile picture
		var profilePicture = app.createTableRow(
			  app.createLabel(string + 'picture_upload', 'Profile picture (aspect ratio must be 1:1): '),
			  // name, forvalueid, maxwidth, maxheight
			  app.createFileUpload(string + 'picture.png', string + 'picture_upload', 600, 600)
			);
		table.appendChild(profilePicture);

    // Profile picture URL
    var profilePictureURL = app.createTableRow(
        app.createLabel(string + 'picture_link', "If there isn't a local file, input a url (url MUST start with //www. and NOT http://www): "),
        // name, forvalueid, maxwidth, maxheight
        app.createInput('text', string + 'picture_link', string + 'picture_link')

      );
    table.appendChild(profilePictureURL);
    app.createSmall('note: the picture URL will take precedence over the local file', table);
		// Member email
		var memberEmail = app.createTableRow(
			  app.createLabel(string + 'email_input', 'Email: '),
			  app.createInput('text', string + 'email', string + 'email_input')
			);
		table.appendChild(memberEmail);

    // Member linkedin
    var memberLinkedin = app.createTableRow(
    	  app.createLabel(string + 'linkedin_input', 'LinkedIn profile link: '),
    	  app.createInput('text', string + 'linkedin', string + 'linkedin_input')
    	);
    table.appendChild(memberLinkedin);

	  // append table to DOM
		fieldset.appendChild(header);
		fieldset.appendChild(table);
	}
	document.body.appendChild(fieldset);
};

app.createSettingsHTML();

// create a json file
app.jsonInit(app.currentJSON, true);
