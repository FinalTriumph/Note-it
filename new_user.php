<?php

session_start();

require "database.php";

if ( !empty($_POST['username']) && !empty($_POST['password']) ) {

  $user = $_POST['username'];
  
  //check if username exists
  $records = $conn->prepare("SELECT username FROM users WHERE username = :username");
  $records->bindParam(':username', $user);
  $records->execute();
  $results = $records->fetch(PDO::FETCH_ASSOC);
  
  if ($results === false) {
    
    $pass = password_hash($_POST['password'], PASSWORD_BCRYPT);
    
    //enter new user in database
    $sql = "INSERT INTO users (username, password) VALUES (:username, :password);";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":username", $user);
    $stmt->bindParam(":password", $pass);

    if( $stmt->execute() ) {
      $_SESSION["user_id"] = $user;
      echo "user created";
    } else {
      echo "failed to create user";
    }
  } else {
    echo "Username already exists";
  }
} else {
  echo "Error: Couldn't receive new user data.";
}

?>
