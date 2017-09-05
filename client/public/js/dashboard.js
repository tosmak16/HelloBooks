$(document).ready(function () {
  $('select').material_select();
});
// Menu Toggle Script 

$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

var rapper = $("#page-content-wrapper");
var pa = $("#pa");
var par = $("#par");
var rap = $("#rap");
$("#menu-toggle").click(function (e) {

  e.preventDefault();
  //  rapper.toggle();
});

$("#dash").click(function (e) {

  // e.preventDefault();
  rapper.show();
  par.hide();
  pa.hide();
});
$("#myP").click(function (e) {

  e.preventDefault();
  rapper.hide();
  par.hide();
  pa.show();
});
$("#bor").click(function (e) {

  rapper.hide();
  par.show();
  pa.hide();
});


$('.modal').modal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: .5, // Opacity of modal background
  inDuration: 300, // Transition in duration
  outDuration: 200, // Transition out duration
  startingTop: '4%', // Starting top style attribute
  endingTop: '10%', // Ending top style attribute
  ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
    alert("Ready");
    console.log(modal, trigger);
  },
  complete: function() { alert('Closed'); } // Callback for Modal close
}
);
