<?php

session_start();

require "database.php";

if ( isset($_SESSION["user_id"]) ) {
  
  $records = $conn->prepare("SELECT username, password FROM users WHERE username = :username");
  $records->bindParam(':username', $_SESSION["user_id"]);
  $records->execute();
  $results = $records->fetch(PDO::FETCH_ASSOC);
  
  $user = NULL;
  $count;
  $num = 0;
  
  if ($results !== false) {
    $user = $results;
    
    $stmt = $conn->prepare("SELECT count(*) FROM notes WHERE username = :username");
    $stmt->bindParam(':username', $user["username"]);
    $stmt->execute();
    $count = $stmt->fetch();
  
    $num = $count[0];
  } else {
      header("Location: /");
  }
} else {
    header("Location: /");
}

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Profile | Note It</title>
  <link rel="icon" href="/images/icon.png">
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <link rel="stylesheet" type="text/css" href="css/spinner.css">
  <link href="https://fonts.googleapis.com/css?family=Sintony" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
</head>

<body>
    
    <div id="profile">
      
      <a href="/"><button><img src="images/noteitws.png" />Back to Notes</button></a>
      <a href="logout.php"><button>Logout</button></a><br />
      <div id="prusern">Username: <?= $user["username"]; ?></div><br />
      <div id="prnotess">Notes saved: <?= $num; ?></div><br />
        
      <button onclick="changePass()" id="changePassBtn">Change Password</button><br />
        
      <form id="changePassForm" onsubmit="return false;">
        <p4 id="closeChangePass">x</p4>
        <br />
        <p1>Old Password:</p1><br />
        <input type="password" name="oldPass" /><br />
        <p2 id="oldPassError"> </p2><br />
        <p1>New Password:</p1><br />
        <input type=password name="newPass" /><br />
        <p2 id="newPassError"> </p2><br />
        <p1>Confirm New Password:</p1><br />
        <input type=password name="confirmNewPass" /><br />
        <p2 id="confirmPassError"> </p2><br />
        <input type="button" value="Submit" onclick="changePassword(this)" />
        <div class="spinner_v2">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </form>
        
      <button id="delacc" onclick="deleteAcc()">Delete Account</button>
        
      <form id="deleteForm" onsubmit="return false;">
        <p4 id="closeDeleteAcc">x</p4><br />
        <p1>Enter your password to permanently delete your account with all saved notes:</p1><br />
        <input type='password' name="deletePass" /><br />
        <p2 id="deletePassError"> </p2><br />
        <input type="button" value="DELETE Account" onclick="deleteAccount(this)" />
        <div class="spinner_v2">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </form>
    
    </div>
    
    <div id="popup">
      <div id="passchanged">
        <p3>Your password has been successfully changed</p3></br>
        <button id="psOKbtn" onclick="passChangedOk()">OK</button>
      </div>
      <div id="accdeleted">
        <p3>Your account has been successfully deleted</p3></br>
        <button id="adOKbtn" onclick="profDeletedOk()">OK</button>
      </div>
    </div>
    
    <script type="text/javascript" src="js/profile.js"></script>
</body>
</html>