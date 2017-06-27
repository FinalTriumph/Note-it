<?php 

session_start();

require "database.php";

if ( isset($_SESSION["user_id"]) ) {
    
    $user = $_SESSION["user_id"];
    
    $records = $conn->prepare("SELECT id, note FROM notes WHERE username = :username");
    $records->bindParam(':username', $user);
    $records->execute();
    $results = $records->fetchAll(PDO::FETCH_ASSOC);
    
    $json = json_encode($results);
    
    echo $json;
}
?>