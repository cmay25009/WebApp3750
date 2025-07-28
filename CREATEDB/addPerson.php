<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST['submit']){
    
    include 'cred.php';


    if ($_POST['submit'] === 'init') {
        $mysql = new mysqli(
            $dbConfig['host'],
            $dbConfig['username'],
            $dbConfig['passwd']
        );

        if ($conn->connect_error){
            die("Connection failed: " . $conn->connect_error);
        }

        $mysql->query("DELETE DATABASE IF EXISTS `$dbFullName`");
        $mysql->query("CREATE DATABASE `$dbFullName`");
        $mysql->select_db($dbFullName);
        $mysql->query("CREATE TABLE Person (
        fname VARCHAR(100),
        lname VARCHAR(100),
        email VARCHAR(100)
        )");
        exit;
    }

    $mysql = mysqli_connect($dbConfig['host'], $dbConfig['username'], $dbConfig['passwd'], $dbFullName);
    if ($mysql->connect_error){
        die("Connection failed: " . $mysql->connect_error);
    }

    if ($_POST['submit'] === 'add') { #  && (isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['email']))
        
        
        $fname = mysqli_real_escape_string($mysql, $_POST['fname']);
        $lname = mysqli_real_escape_string($mysql, $_POST['lname']);
        $email = mysqli_real_escape_string($mysql, $_POST['email']);

        $sql = $mysql->prepare("INSERT INTO Person (fname, lname, email) VALUES (?, ?, ?)");
        $sql->bind_param("sss", $fname, $lname, $email);
        $sql->execute();
        header("Location: index.html");
        exit;

    } elseif ($_POST['submit'] === 'display') {

        $sql = 'SELECT * FROM Person ORDER BY lname';
        $res = mysqli_query($mysql, $sql);
        $data = "";

        if (mysqli_num_rows($result) > 0) {

            $data = $data . "<ul><hr>";
            while($row = mysqli_fetch_assoc($res)) {
                $data = $data . "<li>| Name: " . $row["lname"]. ", " . $row["fname"]. " - " . $row["email"]. " |<li><br><hr>";
            }
            $data = $data . "</ul>";
        }
        echo $data;
        exit;

    } elseif ($_POST['submit'] === 'search'){
        $searchLast = $_POST['searchLast'];
        $sql = 'SELECT * FROM Person WHERE lname '.$searchLast.' ORDER BY lname ';
        $res = mysqli_query($mysql, $sql);
        $data = "";

        if (mysqli_num_rows($result) > 0) {

            $data = $data . "<ul><hr>";
            while($row = mysqli_fetch_assoc($res)) {
                $data = $data . "<li>| Name: " . $row["lname"]. ", " . $row["fname"]. " - " . $row["email"]. " |<li><br><hr>";
            }
            $data = $data . "</ul>";
        }
        echo $data;
        exit;
    }
}

mysqli_close($mysql);
?>