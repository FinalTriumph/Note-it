<?php

$server = "127.0.0.1";
$username = "finaltriumph";
$password = "";
$database = "note_it";

//check if database is connected
try {
  $conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);
} catch(PDOException $e) {
  die("Error: Failed to connect to database");
}

?>
