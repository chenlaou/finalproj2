var clicked = false;
$(".card .far.fa-heart").on("click", function(event) {
  event.stopPropagation();
  if (clicked === false) {
    $(this)
      .removeClass("far")
      .addClass("fas");
    Materialize.toast("Added to Favorites", 3000);
    clicked = true;
    //Stringify object on click
    var articleTitle = $(this).parent()[0].textContent;
    var articleURL = $(this).parent()[0].parentElement.children[3].children[0]
      .href;
    $.post(
      "/api/savedacticles",
      { Title: articleTitle, URL: articleURL },
      function(res) {
        console.log(res);
      }
    );
  } else {
    $(this)
      .removeClass("fas")
      .addClass("far");
    Materialize.toast("Removed from Favorites", 3000);
    clicked = false;
  }
});
