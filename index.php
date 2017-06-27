<?php

session_start();

require "database.php";

if ( isset($_SESSION["user_id"]) ) {
  
  $records = $conn->prepare("SELECT username, password FROM users WHERE username = :username");
  $records->bindParam(':username', $_SESSION["user_id"]);
  $records->execute();
  $results = $records->fetch(PDO::FETCH_ASSOC);
  
  $user = NULL;
  
  if ($results !== false) {
    $user = $results;
  }
}

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Login | Note It</title>
  <link rel="icon" href="/images/icon.png">
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <link rel="stylesheet" type="text/css" href="css/spinner.css">
  <link href="https://fonts.googleapis.com/css?family=Sintony" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
</head>

<body>

  <?php if ( isset($_SESSION["user_id"]) && !empty($user) ): ?>
  
  <script type="text/javascript">
    document.title = "Note It";
  </script>
  
  <div id="header">
    <img src="/images/noteit.png" id="header_logo">
    <button onclick="showNewNote()" id="headernnbtn"><span id="nnplussign">+</span> New Note</button>
    <div id="hdright">
      <button><?= $user["username"]; ?></button>
      <a href="logout.php"><button>Logout</button></a>
    </div>
  </div>
    
  <div id="notes"></div>
  
  <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
  </div>
  
  <div id="popup">
    <div id="new_note">
      <button id="nnXbtn" onclick="hideNewNote()">x</button><br />
      <p1>New note:</p1>
      <textarea id="ta_nn"></textarea><br />
      <p2 id="charNum">500 characters left</p2></br>
      <button id="add_note" onclick="addNote()">Add Note</button>
    </div>
  </div>
  
  <script type="text/javascript" src="get_notes.js"></script>
  
  <?php else: ?>
  
  <div class="home">
    <img src="/images/nalogo.png" alt="Notes App" id="homelogo"/>
  </div>

  <div class="home" id="loginregister">

    <button id="inactbtn">Login</button>
    <a href="register.php"><button>Register</button></a>

    <form id="loginForm">
      <p1>Username:</p1><br />
      <input type=text name="username" /><br />
      <p2 id="usernameError"> </p2><br />
      <p1>Password:</p1><br />
      <input type=password name="password" /><br />
      <p2 id="passwordError"> </p2><br />
      <input type="button" value="Login" onclick="validateForm()">
    </form>

  </div>
  
  <?php endif; ?>
  
<script type="text/javascript" src="validate_login_form.js"></script>
<script type="text/javascript" src="logged_in.js"></script>


</body>
</html>
