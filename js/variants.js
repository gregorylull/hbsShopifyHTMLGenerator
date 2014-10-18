  window.hbsApp = {};
  hbsApp = window.hbsApp;

  // split variants
  hbsApp.variants = {};

  // test cases

  // processData
  hbsApp.variants.processData = function (data) {
    var v = hbsApp.variants;
    v.hashID = {};
    v.idHash = {};
    v.options = {};
    v.options.len = data.options.length;
    v.options[0] = null;
    v.options[1] = null;
    v.options[2] = null;
    v.options.allowed = {};

    // this is setting up data for dom creation
    for (var i = 0; i < data.options.length; i++) {
      if (!v.options[i]) {
        var optionObj = data.options[i];
        v.options[i] = {};
        v.options[i].name = optionObj.name;
        v.options[i].position = optionObj.position;
        v.options[i].option = {};
        v.options[i].order = [];
        v.options[i].ul = null;
      }
    }

    // create a hash table for quick access, then record each variant's option so we have a master list
    for (var i = 0, len = data.variants.length; i < len; i++) {
      var variant = data.variants[i];

      v.hashID[variant.title] = variant;
      v.idHash[variant.id] = variant;

      // we will create a dictionary so that we can keep track of what order the options appear in
      // e.g. for clothing sizes, they should appear in whatver order the merchant specified: s, m, l

      for (var j = 0; j < data.options.length; j++) {
        var value = variant["option" + (j+1)];
        var masterKey = v.options[j].option; // this master key is for the order
        if (value) {
          if (!masterKey[value]) {
            v.options[j].order.push(value);
          }
          masterKey[value] = true;
        }

        if (!v.options.allowed[value]) {
          v.options.allowed[value] = {};
          v.options.allowed[value].self = {value: value, position: j };
          v.options.allowed[value].coexist = {};
        }

        for (var k = 0; k < data.options.length; k++) {
          if (k !== j) {
            v.options.allowed[value].coexist[variant["option" + (k+1)]] = true;
          }
        }

      }
    }

    // dirty is the FIRST thing to be checked, and has to be resolved
    // starts as true? so we can trigger it?
    v.dirty = null;

    // each time an item is changed, these are changed to reflect the product
    v.choice0 = null;
    v.choice1 = null;
    v.choice2 = null;

    // coexist. currently, once a user selects, that becomes the order in which to calculate a set
    v.setOrder = {
      first: null,
      second: null,
      third: null
    };

    v.setAllowed = null;

    // current variant
    v.current = {
      title: null,
      id: null,
      obj: null
    };
  };

  hbsApp.variants.getPosition = function (li) {
    return $(li).parent().attr('option-position');
  };

  hbsApp.variants.clearPrevious = function (choice) {
    if (choice) {
      choice.node.removeClass('selected');
    }
  };

  hbsApp.variants.getVariantviaOptions = function () {
    var variantString = Array.prototype.join.call(arguments, " / ");
    return hbsApp.variants.hashID[variantString];
  };

  // createDOM, called ONCE
  hbsApp.variants.createDOM = function (data) {
    var options = hbsApp.variants.options;
    var target = $("#product-add").prev();
    if (target.length < 1) {
      target = $(".product-vendor");
      if (target.length < 1) {
        target = $(".product-name");
      }
    }

    var master = $('<div></div>').attr('id', 'variant-table');

    for (var i = 0; i < options.len; i++) {
      var option = options[i];
      var div = $('<div></div>').addClass('variant-options');
      var small = $('<small></small>').addClass('variant-name').attr('variant-name', option.name).text(option.name);
      var ul = $('<ul></ul>').addClass('variant-list').attr('option-position', i);

      for (var j = 0; j < option.order.length; j++) {
        var li = $('<li></li>').attr('variant-option', option.order[j]).text(option.order[j]);
        ul.append(li);
      }
      option.ul = ul;
      master.append(div.append(small).append(ul));
    }

    // return a dom, also insert this new dom before the add cart button
    target.after(master);
    return master;
  };

  // for user input, there should be a certain order, which will limit what future choices can be

  hbsApp.variants.setPosition = function (li) {
    var key = {
      '0': 'first',
      '1': 'second',
      '2': 'third',
    };
    var v = hbsApp.variants;
    var options = v.options;
    var position = parseInt(v.getPosition(li), 10);
    var value = $(li).attr('variant-option')
    var coexist = options.allowed[value].coexist;
    for (var i = 0; i < v.options.len; i++) {
      if (!v.setOrder[key[i]]) {
        console.log("run three times max?");
        v.setOrder[key[i]] = {};
        v.setOrder[key[i]].coexist = coexist;
        v.setOrder[key[i]].position = position;
        v.setOrder[key[i]].self = options.allowed[value].self;
        return;
      // if
      } else if (v.setOrder[key[i]].position === position) {
        v.setOrder[key[i]].coexist = coexist;
        v.setOrder[key[i]].self = options.allowed[value].self;
        return;
      }
    }
  };

  // objA is considered first/remaining
  hbsApp.variants.set = function (objA, objB) {
    var results = {};
    for (var option in objB) {
      if (objA[option]) {
        results[option] = true
      }
    }
    return results;
  };

  hbsApp.variants.getRowValues = function (ul) {
    if (typeof ul === 'number') {
      ul = $("#variant-table ul")[ul];
    }
    var results = {};
    $(ul).children().each(function (index) {
      results[$(this).attr('variant-option')] = true;
    });

    return results;
  };

  /*
    test
  */

  /*
    i need a co exist function...not just if it can exist...a set function
  */
  hbsApp.variants.getSet = function () {
    var key = {
      "0": 'first',
      "1": 'second',
      "2": 'third'
    };
    var v = hbsApp.variants;
    var first = v.setOrder.first;
    var second = v.setOrder.second;
    var third = v.setOrder.third;
    v.setAllowed = {};

    if (first) {
      v.setAllowed[first.position] = v.getRowValues(first.position);
      for (var i = 0; i < v.options.len; i++) {
        if (i !== first.position) {
          v.setAllowed[i] = v.set(first.coexist, v.getRowValues(i));
        }
      }
      if (second) {
        for (var i = 0; i < v.options.len; i++) {
          if (i !== first.position && i !== second.position) {
            v.setAllowed[i] = v.set(first.coexist, second.coexist);
            // v.setAllowed[i] = v.set(v.setAllowed[second.position], v.getRowValues(i));
          }
        }

        if (third) {
          // v.setAllowed[third.position] = v.set(v.setAllowed[second.position], third.coexist);
        }
      }
    }

    return v.setOrder;
  };

  // when an option is clicked, we check if options belonging to other positions can coexist with it
  hbsApp.variants.availableToggle = function (target, ul, toggleClass) {
    var v = hbsApp.variants;
    var options = hbsApp.variants.options;
    var currentOption = options.allowed[target];
    var position = ul.attr('option-position');

    // we look at each element, and make sure it can exist with 
    ul.children().each(function (index) {
      var opt = $(this).attr('variant-option');
      // var allow = currentOption.coexist[opt]; // this should be a function
      var allow = v.setAllowed[position][opt];

      // if this item is not allowed to exist, we remove it's tag
      if (!allow) {
        $(this).addClass(toggleClass).removeClass('selected');
      } else {
        $(this).removeClass(toggleClass);
      }
    });
  };

  hbsApp.variants.getHash = function () {
    var results = {};
    results.options = [];
    results.hash = null;
    results.id = null;
    results.error = true;
    results.variant = null;
    var selected = $("#variant-table ul .selected");
    var v = hbsApp.variants;
    if (selected.length === v.options.len) {
      selected.each(function (index) {
        results.options.push($(this).attr('variant-option'));
      });

      results.hash = results.options.join(" / ");
      results.variant = v.hashID[results.hash];
      results.id = results.variant.id;
      results.error = false;
      return results;
    }

    return results;
  };

  /*
  */

  hbsApp.variants.addEvents = function (node) {
    var v = hbsApp.variants;
    var options = hbsApp.variants.options;
    $("#variant-table ul").on('click', 'li', function (event) {

      // 
      var position = v.getPosition($(this));
      var value = $(this).attr('variant-option');
      var choice = v['choice' + (position)];

      // 
      if (!$(this).hasClass('not-an-option') && !$(this).hasClass('selected')) {

        // 
        v.clearPrevious(choice);
        $(this).addClass('selected');
        v['choice' + position] = {node: $(this), value: value};

        // recalculate what is allowed to exist
        v.setPosition($(this));
        v.getSet();

        // this forloop will CHECK what is available to exist and toggle-off invalid options
        for (var i = 0; i < options.len; i++) {
          var position = parseInt($(this).parent().attr('option-position'), 10);
          if (i !== position) {
            v.availableToggle($(this).attr('variant-option'), options[i].ul, "not-an-option");
          }
        }

      } else if ($(this).hasClass('not-an-option')) {
      }

      var userChoice = v.getHash();
      if (userChoice.options.length === v.options.len && !userChoice.error) {
        console.log('hash: ', userChoice.hash);
        console.log('id: ', userChoice.id);
        $('#product-variants select').val(userChoice.id);
      }

    });
  };
  
  // 3 tries, otherwise error
  hbsApp.variants.failCallback = function (data, triesLeft) {
    if (triesLeft > 0) {
      hbsApp.variants.ajax(productHandle, triesLeft-1);
    } else {
      console.log("Cannot get variant data, error: \n", data);
    }
  };

  // on success, our success function will call an init function that takes care of DATA, DOM, and LOGIC
  hbsApp.variants.successCallback = function (data) {
    if (data) {
      var v = hbsApp.variants;
      var parsed = typeof data === 'string' ? JSON.parse(data) : data;

      v.processData(parsed);
      var dom = v.createDOM(parsed);
      v.addEvents(dom);
      v.populateSelections(data);
      v.preventAddToCart();
    }
  };

  hbsApp.variants.preventAddToCart = function () {
    var v = hbsApp.variants;
    $("#add").one('click', function (e) {
      if (v.getHash().error) {
        e.preventDefault;
        // add warning msg
        var msg = "Please select a style for each available option, thank you!"
        var small = $('<small></small>').attr('id', 'variant-warning').text(msg);
        $("#product-add").after(small);
      }

      // prevent adds if not complete
      $("#add").on('click', function (e) {
        if (v.getHash().error) {
          e.preventDefault;
        }
      });
    });
  };

  hbsApp.variants.populateSelections = function (data) {
    var options = hbsApp.variants.options;
    var v = hbsApp.variants;
    var firstVariant = $('#product-variants select').val();
    var variantOptions = v.idHash[firstVariant].options;
    for (var i = 0; i < options.len; i++) {
      var selectOpt = variantOptions[i];
      var ul = options[i].ul;
      console.log('pos: ', i, ', ul: ', ul);
      var found = false
      $(ul).children().each(function (index) {
        if (!found && $(this).attr('variant-option') === selectOpt) {
          console.log('this: ', $(this).attr('variant-option'), ',select: ', selectOpt);
          $(this).click();
          found = true;
        }
      });
    }
  };
   /*
  }
  }
  -------------------------------------------------------------------
  */


  $(function () {
    hbsApp.data = window.myData;
    hbsApp.variants.successCallback(hbsApp.data);

        // test case 1
    hbsApp.data1 = {
      "xs": true,
      "sm": true,
      "A": true,
      "B": true,
      "Partner": true,
      "Parent": true
    };

    // test case 2
    hbsApp.data2 = {
      "A": true,
      "Parent": true
    };
  });