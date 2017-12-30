$(document).ready(function() {


  ////////////////////////////////
  ////// FIRST THINGS FIRST //////
  ////////////////////////////////


  // Check if device is mobile
  window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  if (window.mobilecheck) {
    $(".header-text").text("Desktop");
  } else {
    $(".header-text").text("Mobile");
  }

  // Enable jQuery UI sortable functionality
  $(".sortable").sortable();
  $(".sortable").disableSelection();

  // Hide clear gifs button initially
  $(".clear-gif-area-btn").hide();

  ///////////////////////////////
  ////// GLOBAL VARIABLES ///////
  ///////////////////////////////


  // GIPHY API Key
  var apiKey = "pu0g7RhCjo8xLoaeWnNyrJu1xfGOQh1R";

  // Initial castMembers array
  var initialCastMembers = [
    {
      name: "Dan Aykroyd",
      image: "dan_aykroyd.jpg"
    },
    {
      name: "Chevy Chase",
      image: "chevy_chase.jpg"
    },
    {
      name: "Jane Curtin",
      image: "jane_curtin.jpg"
    },
    {
      name: "Chris Farley",
      image: "chris_farley.jpg"
    },
    {
      name: "Will Ferrell",
      image: "will_ferrell.jpg"
    },
    {
      name: "Eddie Murphy",
      image: "eddie_murphy.jpg"
    },
    {
      name: "Bill Murray",
      image: "bill_murray.jpg"
    },
    {
      name: "Amy Poehler",
      image: "amy_poehler.jpg"
    },
    {
      name: "Gilda Radner",
      image: "gilda_radner.jpg"
    },
    {
      name: "Adam Sandler",
      image: "adam_sandler.jpg"
    },
    {
      name: "Kenan Thompson",
      image: "kenan_thompson.jpg"
    },
    {
      name: "Kristen Wiig",
      image: "kristen_wiig.jpg"
    }
  ];

  // Set castMembers array to initialCastMembers array initally
  var castMembers = initialCastMembers.slice(0);

  // Initialize customCastMembers string for future use in storing HTML
  var customCastMembers;

  // Boolean to ensure Clear Gifs button doesn't remove instructions prior to user generating first set of gifs
  var hasGeneratedGifs = false;


  ////////////////////////////
  ////// EVENT HANDLERS //////
  ////////////////////////////


  // Cast Members Button Click Handler
  $(document).on("click", ".cast-members-btn", function() {
    // Toggle "hidden" class on sidebar class
    $(".sidebar").toggleClass("hidden");
  });

  // Add Cast Member Button Click Handler
  $(document).on("click", ".add-cast-member-btn", function() {
    $(".search-form").slideToggle("fast", "swing");
    $("#search-input").focus();
    $("#search-input").val("");
  });

  // Clear Gifs Button Click Handler
  $(document).on("click", ".clear-gif-area-btn", function() {
    if(hasGeneratedGifs) {
      // Empty gif-area
      $(".gif-area").empty();
      // Hide button
      $(".clear-gif-area-btn").hide();
    }
  });

  // Append Cast Member Button Click Handler
  $(document).on("click", "#append-cast-member-btn", function(event) {
    // Prevent button from reloading page
    event.preventDefault();
    // Close search form
    $(".search-form").slideToggle("fast", "swing");

    // Add input to array
    var newCastMember = {
      name: `${$("#search-input").val().trim()}`,
      image: "snl.jpg"
    };

    // Add new button to beginning of castMembers array
    castMembers.unshift(newCastMember);

    // Clear search form
    $("#search-input").val("");

    // Call createButtons functions
    createButtons();

    // Select new button
    var newBtn = $(".btn-area div:first-child").find(".cast-member-btn");

    // Call createGifs
    createGifs(newBtn);
  });

  // Cast Member Button Click Handler
  $(document).on("click", ".cast-member-btn", function() {
    // Save clicked button to a variable
    var clickedBtn = $(this);
    // Call createGifs function and pass it clickedBtn
    createGifs(clickedBtn);
  });

  // Gif Click Event Handler
  $(document).on("click", ".cast-member-gif", function() {
    // Store clicked gif's src as a variable
    var clickedGifSrc = $(this).attr("src");
    // If gif is playing
    if ($(this).hasClass("playing")) {
      // Change src to still version
      $(this).attr("src", clickedGifSrc.replace(/\.gif/i, "_s.gif"));
      // Remove class "playing"
      $(this).removeClass("playing");
    } else {
      // Otherwise, gif is stopped
      // Add class "playing"
      $(this).addClass("playing");
      // Change src to non-still version
      $(this).attr("src", clickedGifSrc.replace(/\_s.gif/i, ".gif"));
    }
  });

  // Close Search Bar Event Handler
  $(document).on("click", "#close-search-btn", function() {
    // Toggle search form slide
    $(".search-form").slideToggle("fast", "swing");
    // Clear content
    $("#search-input").val("");
  });

  // Close Cast Member Button Click Handler
  $(document).on("click", ".cast-member-btn-close", function() {
    // Save parent to a variable
    var clickedParent = $(this).parent();
    // Save value of index attribute of clicked button to variable
    var clickedIndex = clickedParent.attr("index");

    // Remove element at index of clickedIndex from castMembers array
    castMembers.splice(clickedIndex, 1);

    // Animate button disappearing
    clickedParent.animate({opacity: 0}, 300);

    // Call createButtons
    setTimeout(createButtons, 300);
  });

  // Save Custom List Button Click Handler
  $(document).on("click", ".save-gif-area-btn", function() {
    for (i = 1; i <= $(".btn-area").children().length; i++) {
      // Save HTML of btn-area to the customCastMembers varible
      customCastMembers = $(".btn-area").html();
    }
  });

  // Load Custom List Button Click Handler
  $(document).on("click", ".load-gif-area-btn", function() {
    // Set btn-area HTML to customCastMembers
    $(".btn-area").html(customCastMembers);
  });

  // Load Original List Button Click Handler
  $(document).on("click", ".reset-gif-area-btn", function() {
    castMembers = initialCastMembers.slice(0);
    createButtons();
  });


  ///////////////////////
  ////// FUNCTIONS //////
  ///////////////////////

  function createButtons() {
    // Empty btn-area
    $(".btn-area").empty();
    // Loop through castMembers array
    for (i = 0; i < castMembers.length; i++) {
      // Save current cast member info to variables
      var castMemberName = castMembers[i].name;
      var castMemberImage = castMembers[i].image;

      // Append a button to btn-area
      $(".btn-area").append(`
        <div class="cast-member-btn-wrapper" index=${i}>
          <i class="fa fa-bars cast-member-reorder" aria-hidden="true"></i>
          <button type="button" class="btn btn-dark cast-member-btn" cast-member-name="${castMemberName}">
            <img class="cast-member-img" src="assets/images/${castMemberImage}">
            <p class="cast-member-name">${castMemberName}</p>
            <button type="button" class="cast-member-btn-close"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
          </button>
        </div>`);
    }
  }

  function createGifs(button) {
    // Change hasGeneratedGifs to true
    hasGeneratedGifs = true;

    // Save clicked button's cast-member-name attribute to a string
    var clickedName = button.attr("cast-member-name");

    // Construct GIPHY query URL
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=snl+${clickedName}&api_key=${apiKey}&limit=10`;

    console.log(queryURL);

    // AJAX Request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Empty gif-area
      $(".gif-area").empty();

      // Hide Sidebar
      $(".sidebar").addClass("hidden");

      // Loop through the response data gifs
      for (i = 0; i < response.data.length; i++) {
        // Save current gif to a variable
        var currentGif = response.data[i];

        // Append a gif container, rating, and gif to the gif-area
        $(".gif-area").append(`
          <div class="gif-container">
            <div class="gif-rating">${currentGif.rating}</div>
            <img class="cast-member-gif" src="${currentGif.images.fixed_height_still.url}">
          </div>`);
      }

      // Show hide gifs button
      $(".clear-gif-area-btn").show();
    });
  }


  ////////////////////////////
  ////// FUNCTION CALLS //////
  ////////////////////////////


  createButtons();


});
