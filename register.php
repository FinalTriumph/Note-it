<?php

session_start();

require "database.php";

if ( isset($_SESSION["user_id"]) ) {
  header("Location: /");
}

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Register | Note It</title>
  <link rel="icon" href="/images/icon.png">
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <link href="https://fonts.googleapis.com/css?family=Sintony" rel="stylesheet">
</head>

<body>

  <div class="home">
    <img src="/images/nalogo.png" alt="Notes App" id="homelogo"/>
  </div>

  <div class="home" id="loginregister">
    <a href="/" ><button>Login</button></a>
    <button id="inactbtn">Register</button>

    <form id="registerForm">
      <p1>Username:</p1><br />
      <input type=text name="username" /><br />
      <p2 id="usernameError"> </p2><br />
      <p1>Password:</p1><br />
      <input type=password name="password" /><br />
      <p2 id="passwordError"> </p2><br />
      <p1>Confirm Password:</p1><br />
      <input type=password name="confirmPassword" /><br />
      <p2 id="confirmPasswordError"> </p2><br />
      <input type="button" value="Register" onclick="validateForm()">
    </form>
    <div id="about">About</div>

  </div>
  
  <div id="popup3">
    <div id="aboutText">
      <button id="closeAbout">x</button><br /><br />
      <p1>This application was made as part of PHP/MySQL programming practice.</p1><br /><br />
      <p1>It may be used as follows:</p1><br />
      <p2>- User can register new account/login.</p2><br />
      <p2>- Authenticated users can add up to 500 characters long notes.</p2><br />
      <p2>- All notes are private and every user can see only their notes.</p2><br />
      <p2>- Authenticated users can edit/remove their added notes.</p2><br />
      <p2>- Authenticated users can also change their password or delete account permanently.</p2><br />
      <br />
      <p1>If any errors spotted, feel free to <a href="http://finaltriumph.tk/" target="_blank">contact me and let me know</a>.</p1><br /><br />
      <p3>Made by <a href="http://finaltriumph.tk/" target="_blank"><img src="images/FinalTriumph.png" alt="FinalTriumph"></a></p3>
    </div>
  </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
<script type="text/javascript" src="js/validate_register_form.js"></script>

</body>
</html>
