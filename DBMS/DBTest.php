<?php

require_once 'config.php';

$db = new mysqli($servername, $username, $password, $dbname);

echo "<h3>Connected to MySQL</h3>";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["name"])) {
    $name = $_POST["name"];

    $entry = $db->prepare("INSERT INTO test_users (username) VALUES (?)");
    $entry->bind_param("s", $name);
    $entry->execute();
    $entry->close();
    echo "<p>'$name' added successfully.</p>";
}

else {
    
    $result = $db->query("SELECT id, username FROM test_users ORDER BY id ASC");
    if ($result && $result->num_rows > 0) {
        echo "<h3>Stored Names:</h3><div id=\"names\" class=\"dialogue-box\">";
        while ($row = $result->fetch_assoc()) {
            echo "<li>[" .htmlspecialchars($row['id'])."] | " . htmlspecialchars($row['username']) . "</li>";
        }
        echo "</div>";
    } 
}
$db->close();
?>
