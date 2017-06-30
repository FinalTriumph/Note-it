<?php 

session_start();

require "database.php";

if ( !empty($_POST["oldpass"]) && !empty($_POST["newpass"]) && isset($_SESSION["user_id"]) ) {
    
    $user = $_SESSION["user_id"];
    $oldpass = $_POST["oldpass"];
    $newpass = $_POST["newpass"];
    
    $records = $conn->prepare("SELECT username, password FROM users WHERE username = :username");
    $records->bindParam(':username', $user);
    $records->execute();
    $results = $records->fetch(PDO::FETCH_ASSOC);

    if ($results === false) {
        echo "Error: Couldn't find username.";
    } else if (password_verify($oldpass, $results['password'])) {
        
        $readypass = password_hash($newpass, PASSWORD_BCRYPT);
        
        $sql = "UPDATE users SET password = :password WHERE username = :username";

        $stmt = $conn->prepare($sql);
    
        $stmt->bindParam(":username", $user);
        $stmt->bindParam(":password", $readypass);
    
        if( $stmt->execute() ) {
          echo "Success";
        } else {
          echo "Error: Failed to change password.";
        }
    } else {
        echo "Incorrect password";
    }

} else {
    echo "Error: Failed to receive data.";
}

?>