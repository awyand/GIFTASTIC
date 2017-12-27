$(document).ready(function() {


  ///////////////////////////////
  ////// GLOBAL VARIABLES ///////
  ///////////////////////////////


  // GIPHY API Key
  var apiKey = "pu0g7RhCjo8xLoaeWnNyrJu1xfGOQh1R";

  // Initial castMembers array
  var castMembers = ["Dan Aykroyd", "Chevy Chase", "Jane Curtin", "Chris Farley", "Will Ferrell", "Eddie Murphy", "Bill Murray", "Amy Poehler", "Gilda Radner", "Adam Sandler", "Kenan Thompson", "Kristen Wiig"];

  ////////////////////////////
  ////// EVENT HANDLERS //////
  ////////////////////////////


  // Cast Members Button Click Handler
  $(document).on("click", ".cast-members-btn", function() {
    // Toggle "hidden" class on sidebar class
    $(".sidebar").toggleClass("hidden");
    // If sidebar is hidden
    if ($(".sidebar").hasClass("hidden")) {
      // Make header font-size 5rem
      $(".header-text").css("font-size", "5rem");
    } else {
      // If sidebar is not hidden, make header font-size 4rem
      $(".header-text").css("font-size", "4rem");
    }
  });

  // Add Cast Member Button Click Handler
  $(document).on("click", ".add-cast-member-btn", function() {
    $(".search-form").slideToggle("fast", "swing");
  });

  // Append Cast Member Button Click Handler
  $(document).on("click", ".append-cast-member-btn", function(event) {
    // Prevent button from reloading page
    event.preventDefault();
    // Close search form
    $(".search-form").slideToggle("fast", "swing");
    // Compare input to valid cast list
    // Add input to array
    var newCastMember = $("#search-input").val().trim();
    castMembers.push(newCastMember);

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

  // Gif click event hanlder
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


  ///////////////////////
  ////// FUNCTIONS //////
  ///////////////////////


  function createButtons() {
    // Empty btn-area
    $(".btn-area").empty();

    // Loop through castMembers array
    for (i = 0; i < castMembers.length; i++) {
      // Save current cast member to a variable
      var castMember = castMembers[i];
      // Append a button with class cast-member-btn and attribute cast-member-name to btn-area
      $(".btn-area").append(`<button type="button" class="btn btn-dark cast-member-btn" cast-member-name="${castMember}">${castMember}</button>`);
    }
  }

  ////////////////////////////
  ////// FUNCTION CALLS //////
  ////////////////////////////


  createButtons();


});
