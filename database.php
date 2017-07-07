<?php

//Heroku
$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$database = substr($url["path"], 1);
//////////

/* Cloud9
$server = "127.0.0.1";
$username = "finaltriumph";
$password = "";
$database = "note_it";
*/


//check if database is connected
try {
  $conn = new PDO("mysql:host=$server;dbname=$database;", $username, $password);
} catch(PDOException $e) {
  die("Error: Failed to connect to database");
}

?>
