$(document).ready(function() {


  ///////////////////////////////
  ////// GLOBAL VARIABLES ///////
  ///////////////////////////////


  // GIPHY API Key
  var apiKey = "pu0g7RhCjo8xLoaeWnNyrJu1xfGOQh1R";

  // Initial castMembers array
  var castMembers = [
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
  });

  // Cast Member Button Click Handler
  $(document).on("click", ".cast-member-btn", function() {
    // Save clicked button's cast-member-name attribute to a string
    var clickedName = $(this).attr("cast-member-name");

    // Construct GIPHY query URL
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=snl+${clickedName}&api_key=${apiKey}&limit=10`;

    // AJAX Request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Empty gif-area
      $(".gif-area").empty();

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
    });
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
      // Append a button with class cast-member-btn and attribute cast-member-name to btn-area
      $(".btn-area").append(`
        <button type="button" class="btn btn-dark cast-member-btn" cast-member-name="${castMemberName}">
        <img class="cast-member-img" src="assets/images/${castMemberImage}">
        ${castMemberName}
        </button>`);
    }
  }

  ////////////////////////////
  ////// FUNCTION CALLS //////
  ////////////////////////////


  createButtons();


});
