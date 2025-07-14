<?php
echo "<h1>Form Submission Received</h1>";

echo "<p><strong>Username:</strong> " . htmlspecialchars($_POST['username'] ?? '') . "</p>";
echo "<p><strong>Password:</strong> " . htmlspecialchars($_POST['pwd'] ?? '') . "</p>";
echo "<p><strong>Bio:</strong><br>" . nl2br(htmlspecialchars($_POST['bio'] ?? '')) . "</p>";
echo "<p><strong>Hidden Student ID:</strong> " . htmlspecialchars($_POST['studentID'] ?? '') . "</p>";

if (!empty($_POST['userType'])) {
    echo "<p><strong>User Types:</strong><ul>";
    foreach ($_POST['userType'] as $type) {
        echo "<li>" . htmlspecialchars($type) . "</li>";
    }
    echo "</ul></p>";
} else {
    echo "<p><strong>User Types:</strong> None selected</p>";
}

echo "<p><strong>Gender:</strong> " . htmlspecialchars($_POST['gender'] ?? '') . "</p>";
echo "<p><strong>Country:</strong> " . htmlspecialchars($_POST['country'] ?? '') . "</p>";

if (isset($_FILES['upload']) && $_FILES['upload']['error'] === 0) {
    $fileName = htmlspecialchars($_FILES['upload']['name']);
    $fileType = htmlspecialchars($_FILES['upload']['type']);
    echo "<p><strong>Uploaded File:</strong> $fileName ($fileType)</p>";
} else {
    echo "<p><strong>Uploaded File:</strong> No file uploaded or an error occurred</p>";
}

echo "<p><strong>Homepage URL:</strong> <a href='" . htmlspecialchars($_POST['homepage'] ?? '') . "'>" . htmlspecialchars($_POST['homepage'] ?? '') . "</a></p>";
?>
