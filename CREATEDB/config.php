<?php

$dbConfig = array("host"=>"localhost", "username"=>"u516132945_user", "passwd"=>"CBpizza!9");

$dbFullName = "u516132945_myDB";
$dbName = "myDB";

$conn = new mysqli(
    $dbConfig['host'],
    $dbConfig['username'],
    $dbConfig['passwd']
);

if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}

$conn->query("DELETE DATABASE IF EXISTS `$dbFullName`");
$conn->query("CREATE DATABASE `$dbFullName`");
$conn->select_db($dbFullName);

$conn->query("CREATE TABLE Person (
id INT AUTO_INCREMENT PRIMARY KEY,
fname VARCHAR(100),
lname VARCHAR(100),
email VARCHAR(100)
)");


?>