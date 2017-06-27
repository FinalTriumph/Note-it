<?php 

session_start();

require "database.php";

if ( !empty($_POST["id"]) && isset($_SESSION["user_id"]) ) {
    
    $id = $_POST["id"];
    $user = $_SESSION["user_id"];
    
    $sql = "DELETE FROM notes WHERE id = :id AND username = :user";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":user", $user);
    $stmt->bindParam(":id", $id);

    if( $stmt->execute() ) {
      echo "Success";
    } else {
      echo "Error: Failed to remove note.";
    }
} else {
    echo "Error: Failed to receive data.";
}

?>