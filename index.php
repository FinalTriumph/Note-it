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
  } else {
    session_unset();
    session_destroy();
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
    <div id="hdright">
      <button onclick="showNewNote()" id="headernnbtn">+ Add Note</button>
      <a href="profile.php"><button><?= $user["username"]; ?></button></a>
      <a href="logout.php"><button>Logout</button></a>
    </div>
  </div>
  
  <div id="header_overlay"></div>
    
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
      <p2 id="charNum">500 characters left</p2><br />
      <button id="add_note" onclick="addNote(this)">Add Note</button>
      
      <div class="spinner_v2">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
  </div>
  
  <div id="popup2">
    <div id="confirmDeleteNote">
      <p1>Delete?</p1><br />
      <button id="delNoteYes">Yes</button><button id="delNoteCancel">Cancel</button>
      
      <div class="spinner_v2">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
  </div>
  
  <script type="text/javascript" src="js/get_notes.js"></script>
  
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
      <input type="button" value="Login" onclick="validateForm(this)" />
      <div class="spinner_v2">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </form>
    <div id="about">About</div>

  </div>
  
  <div id="popup3">
    <div id="aboutText">
      <button id="closeAbout">x</button><br /><br />
      <p1>This application was made as part of PHP/MySQL programming practice.</p1><br /><br />
      <p1>It may be used as follows:</p1><br />
      <p2>- Users can register new account/login.</p2><br />
      <p2>- Authenticated users can add up to 500 characters long notes.</p2><br />
      <p2>- All notes are private and users can see only notes they've added.</p2><br />
      <p2>- Authenticated users can edit/remove notes they've added.</p2><br />
      <p2>- Authenticated users can also change their password or delete account permanently.</p2><br />
      <br />
      <p1>If any errors spotted, feel free to <a href="http://finaltriumph.eu/contact" target="_blank">contact me and let me know</a>.</p1><br /><br />
      <p3>Made by <a href="http://finaltriumph.eu/" target="_blank">FinalTriumph</a></p3>
    </div>
  </div>
  
  <?php endif; ?>
  
<script type="text/javascript" src="js/validate_login_form.js"></script>
<script type="text/javascript" src="js/logged_in.js"></script>


</body>
</html>
