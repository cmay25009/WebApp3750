<!-- <?php
// include 'config.php';

// function resetDatabase() {
//   global $mysql;
//   $mysql->query("DELETE TABLE IF EXISTS Person");
//   $mysql->query("CREATE TABLE Person (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     fname VARCHAR(100),
//     lname VARCHAR(100),
//     email VARCHAR(100)
//   )");
// }

// function addPerson($fname, $lname, $email) {
//   global $mysql;
//   $sql = $mysql->prepare("INSERT INTO Person (fname, lname, email) VALUES (?, ?, ?)");
//   $sql->bind_param("sss", $fname, $lname, $email);
//   $sql->execute();
// }

// function getAllPeople() {
//   global $mysql;
//   return $mysql->query("SELECT * FROM Person");
// }

// function searchPeople($searchLast) {
//   global $mysql;
//   $sql = $mysql->prepare("SELECT * FROM Person WHERE LOWER(last_name) LIKE LOWER(?)");
//   $query = '%' . $searchLast . '%';
//   $sql->bind_param("s", $query);
//   $sql->execute();
//   return $sql->get_result();
// }
?> -->
