/* global $ */

function validateForm() {
  $("#usernameError").html(" ");
  $("#passwordError").html(" ");
  $("input[name=username]").css("border-color", "#000");
  $("input[name=password]").css("border-color", "#000");

  var user = $("input[name=username]").val();
  var pass = $("input[name=password]").val();

  if (/\s/.test(user) || /\s/.test(pass) || !user.length || !pass.length) {

    if (/\s/.test(user)) {
      $("#usernameError").html("Username can't contain spaces");
      $("input[name=username]").css("border-color", "#A32003");
    }

    if (/\s/.test(pass)) {
      $("#passwordError").html("Password can't contain spaces");
      $("input[name=password]").css("border-color", "#A32003");
    }

    if (!user.length) {
      $("#usernameError").html("Type in your username");
      $("input[name=username]").css("border-color", "#A32003");
    }

    if (!pass.length) {
      $("#passwordError").html("Type in your password");
      $("input[name=password]").css("border-color", "#A32003");
    }

  } else {

    $.ajax({
      type: 'POST',
      url: 'login.php',
      data: { username: user, password: pass },
      success: function (data) {
        if (data === "fail") {
          alert("Looks like we are having some technical difficulties. Couldn't connect to database.");
        } else if (data === "Username not registered"){
          $("#usernameError").html("Username not found");
          $("input[name=username]").css("border-color", "#A32003");
        } else if (data === "Incorrect password") {
          $("#passwordError").html("Incorrect password");
          $("input[name=password]").css("border-color", "#A32003");
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

$("input[name=username], input[name=password]").keypress(function(e) {
    if (e.which === 13) {
        validateForm();
    }
});
