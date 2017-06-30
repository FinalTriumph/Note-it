<?php 

session_start();

require "database.php";

if ( !empty($_POST["pass"]) && isset($_SESSION["user_id"]) ) {
    
    $user = $_SESSION["user_id"];
    $pass = $_POST["pass"];
    
    $records = $conn->prepare("SELECT username, password FROM users WHERE username = :username");
    $records->bindParam(':username', $user);
    $records->execute();
    $results = $records->fetch(PDO::FETCH_ASSOC);

    if ($results === false) {
        echo "Error: Couldn't find username.";
    } else if (password_verify($pass, $results['password'])) {
        
        $sql = "DELETE FROM users WHERE username = :username";

        $stmt = $conn->prepare($sql);
    
        $stmt->bindParam(":username", $user);
    
        if( $stmt->execute() ) {
            
            session_unset();
            session_destroy();
            
            $sql2 = "DELETE FROM notes WHERE username = :username";

            $stmt2 = $conn->prepare($sql2);
    
            $stmt2->bindParam(":username", $user);
            
            if( $stmt2->execute() ) {
                echo "Success";
            } else {
                echo "Error: Account deleted, but couldn't delete associated notes.";
            }
            
        } else {
          echo "Error: Account couldn't be deleted.";
        }
    } else {
        echo "Incorrect password";
    }

} else {
    echo "Error: Failed to receive data.";
}

?>