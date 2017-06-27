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

  </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
<script type="text/javascript" src="validate_register_form.js"></script>

</body>
</html>
