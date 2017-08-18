//-- signup Toggle Script 

$(document).ready(function () {
    $('select').material_select();
});

$("#signup").click(function (e) {

    e.preventDefault();
    $("#loginForm").hide();
    $("#signUpForm").show();
});
$("#login").click(function (e) {
    $("#loginForm").show();
    $("#signUpForm").hide();
});


$("#createbtn").click(function (e) {

    e.preventDefault();
    $("#loginForm").hide();
    $("#signUpForm").show();
});
