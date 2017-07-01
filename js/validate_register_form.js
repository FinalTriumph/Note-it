/* global $ */

$("#about").click(function() {
  $("#popup3").slideDown(500);
});

$("#closeAbout").click(function() {
  $("#popup3").slideUp(500);
});

function validateForm() {

  $("#usernameError").html(" ");
  $("#passwordError").html(" ");
  $("#confirmPasswordError").html(" ");
  $("input[name=username]").css("border-color", "#000");
  $("input[name=password]").css("border-color", "#000");
  $("input[name=confirmPassword]").css("border-color", "#000");

  var user = $("input[name=username]").val();
  var pass = $("input[name=password]").val();
  var cpass = $("input[name=confirmPassword]").val();

  if (/\s/.test(user) || /\s/.test(pass) || /\s/.test(cpass) 
      || !user.length || !pass.length || !cpass.length 
      || user.length > 20 || pass.length > 20) {

    if (/\s/.test(user)) {
      $("#usernameError").html("Username can't contain spaces");
      $("input[name=username]").css("border-color", "#A32003");
    }

    if (/\s/.test(pass)) {
      $("#passwordError").html("Password can't contain spaces");
      $("input[name=password]").css("border-color", "#A32003");
    }

    if (/\s/.test(cpass)) {
      $("#confirmPasswordError").html("Password can't contain spaces");
      $("input[name=confirmPassword]").css("border-color", "#A32003");
    }

    if (!user.length) {
      $("#usernameError").html("Type in username");
      $("input[name=username]").css("border-color", "#A32003");
    }

    if (!pass.length) {
      $("#passwordError").html("Type in password");
      $("input[name=password]").css("border-color", "#A32003");
    }

    if (!cpass.length) {
      $("#confirmPasswordError").html("Confirm password");
      $("input[name=confirmPassword]").css("border-color", "#A32003");
    }
    
    if (user.length > 20) {
      $("#usernameError").html("Username too long. Maximum length 20 characters.");
      $("input[name=username]").css("border-color", "#A32003");
    }
    
    if (pass.length > 20) {
      $("#passwordError").html("Password too long. Maximum length 20 characters.");
      $("input[name=password]").css("border-color", "#A32003");
    }

  } else if ( pass !== cpass ) {

    $("#confirmPasswordError").html("Passwords don't match");
    $("input[name=confirmPassword]").css("border-color", "#A32003");

  } else {

    $.ajax({
      type: 'POST',
      url: 'new_user.php',
      data: { username: user, password: pass },
      success: function (data) {
        if (data === "fail") {
          alert("Looks like we are having some technical difficulties. Couldn't connect to database.");
        } else  if (data === "Username already exists") {
          $("#usernameError").html("Username already exists");
          $("input[name=username]").css("border-color", "#A32003");
        } else if (data === "failed to create user" && data === "Error: Couldn't receive new user data.") {
          alert("There was some technical error and new user coudn't be created");
        } else {
          window.location.reload();
        }
      },
      error: function (data) {
        alert("Error: " + data);
      }
    });

  }
}

$("input[name=username], input[name=password], input[name=confirmPassword]").keypress(function(e) {
    if (e.which === 13) {
        validateForm();
    }
});
