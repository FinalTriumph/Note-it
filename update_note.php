<?php 

session_start();

require "database.php";

if ( !empty($_POST["id"]) && !empty($_POST["note"]) && isset($_SESSION["user_id"]) ) {
    
    $user = $_SESSION["user_id"];
    $id = $_POST["id"];
    $nNote = $_POST["note"];
    
    $sql = "UPDATE notes SET note = :note WHERE username = :username AND id = :id";

    $stmt = $conn->prepare($sql);
    
    $stmt->bindParam(":note", $nNote);
    $stmt->bindParam(":username", $user);
    $stmt->bindParam(":id", $id);
    
    if( $stmt->execute() ) {
         echo "Success";
    } else {
         echo "Error: Failed to change note.";
    }

} else {
    echo "Error: Failed to receive data.";
}

?>