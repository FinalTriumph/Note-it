<?php

session_start();

if ( isset($_SESSION["user_id"]) ) {
  header("Location: /");
}

require "database.php";

if ( !empty($_POST['username']) && !empty($_POST['password']) ) {

  $records = $conn->prepare("SELECT username, password FROM users WHERE username = :username");
  $records->bindParam(':username', $_POST['username']);
  $records->execute();
  $results = $records->fetch(PDO::FETCH_ASSOC);

  if ($results === false) {
    echo "Username not registered";
  } else if (password_verify($_POST['password'], $results['password'])) {
    $_SESSION["user_id"] = $results['username'];
    echo "Username logged in";
  } else {
    echo "Incorrect password";
  }

} else {
  echo "Error: Something went wrong with login data";
}

?>
