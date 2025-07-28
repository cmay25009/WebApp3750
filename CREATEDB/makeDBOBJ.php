<?php
include 'cred.php';

$conn = new mysqli(
    $dbConfig['host'],
    $dbConfig['username'],
    $dbConfig['passwd']
);

if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}

$conn->query("DELETE DATABASE IF EXISTS `$dbFullName`");
$conn->query("CREATE DATABASE IF NOT EXISTS`$dbFullName`");
$conn->select_db($dbFullName);

$conn->query("CREATE TABLE Person (
fname VARCHAR(100),
lname VARCHAR(100),
email VARCHAR(100)
)");


?>