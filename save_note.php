<?php 

session_start();

require "database.php";

if ( !empty($_POST["note"]) && isset($_SESSION["user_id"]) ) {
    
    $note = $_POST["note"];
    $user = $_SESSION["user_id"];
    
    
    $sql = "INSERT INTO notes (username, note) VALUES (:username, :note);";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":username", $user);
    $stmt->bindParam(":note", $note);

    if( $stmt->execute() ) {
      $inserted_id = $conn->lastInsertId();
      echo "Success ".$inserted_id;
    } else {
      echo "Error: Failed to save note.";
    }
} else {
    echo "Error: Failed to receive data.";
}

?>