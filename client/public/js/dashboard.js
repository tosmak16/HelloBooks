$(document).ready(() => {
  $('select').material_select();
});
// Menu Toggle Script 

$('#menu-toggle').click((e) => {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

let rapper = $('#page-content-wrapper');
let pa = $('#pa');
let par = $('#par');
let rap = $('#rap');
$('#menu-toggle').click((e) => {

  e.preventDefault();
  //  rapper.toggle();
});

$('#dash').click((e) => {

  // e.preventDefault();
  rapper.show();
  par.hide();
  pa.hide();
});
$('#myP').click((e) => {

  e.preventDefault();
  rapper.hide();
  par.hide();
  pa.show();
});
$('#bor').click((e) => {

  rapper.hide();
  par.show();
  pa.hide();
});


$('.modal').modal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: 0.5, // Opacity of modal background
  inDuration: 300, // Transition in duration
  outDuration: 200, // Transition out duration
  startingTop: '4%', // Starting top style attribute
  endingTop: '10%', // Ending top style attribute
  ready (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
    alert("Ready");
  },
  complete () { alert('Closed'); } // Callback for Modal close
}
);

