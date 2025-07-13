<?php
ob_start();
echo "<!-- DEBUG: POST action = " . ($_POST['action'] ?? 'NOT SET') . " -->\n";

$action = $_POST['action'] ?? '';
$dir = "data/"; 
$files = [
    "prime" => $dir . "prime.txt",
    "armstrong" => $dir . "armstrong.txt",
    "fibonacci" => $dir . "fibonacci.txt",
    "none" => $dir . "none.txt"
];

if (!isset($_COOKIE["visited"])) {
    foreach ($files as $file) {
        $handle = fopen($file, "w");
    }
    setcookie("visited", "true", time() + 3600 * 24);
}

function isPrime($n)
{
    if ($n <= 1) { return false; }

    for ($i = 2; $i <= sqrt($n); $i++) {
        if ($n % $i == 0) { return false; }
    }

    return true;
}

function isArmstrong($n)
{
    $digits = str_split((string) $n);
    $power = count($digits);
    $sum = 0;
    foreach ($digits as $d) {
        $sum += pow($d, $power);
    }
    return $sum == $n;
}

function isFibonacci($n)
{
    $isPerfectSquare = function ($x) {
        return pow((int) sqrt($x), 2) == $x;
    };
    return $isPerfectSquare(5 * $n * $n + 4) || $isPerfectSquare(5 * $n * $n - 4);
}

function appendToFile($filename, $content)
{
    $handle = fopen($filename, "a");
    fwrite($handle, $content . PHP_EOL);
    fclose($handle);
}

function readFileContents($filename)
{
    if (!file_exists($filename))
        return "";
    $handle = fopen($filename, "r");
    $data = fread($handle, filesize($filename));
    fclose($handle);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST["action"];

    if ($action === "check") {
        $input = $_POST["numbers"] ?? "";
        $numbers = preg_split("/[\s,]+/", trim($input));
        foreach ($numbers as $num) {
            if (!is_numeric($num)) { continue; }

            $num = (int) $num;

            if (isPrime($num))
                appendToFile($files["prime"], $num);
            if (isArmstrong($num))
                appendToFile($files["armstrong"], $num);
            if (isFibonacci($num))
                appendToFile($files["fibonacci"], $num);
            if (!isPrime($num) && !isArmstrong($num) && !isFibonacci($num))
                appendToFile($files["none"], $num);
        }
        
        echo "Successfully Checked";
        exit;
    }

    if ($action === "reset") {
        foreach ($files as $file) {
            if (file_exists($file)) { unlink($file); }
        }
        setcookie("visited", "", time() - 1);
        exit;
    }

    if (array_key_exists($action, $files)) {
        $file = $files[$action];
        if (file_exists($file)) {
            $contents = file($file);
            echo "<h3>" . ucfirst($action) . ":</h3><br>";
            echo "<p>".$contents[0];
            foreach (array_slice($contents, 1) as $line) {
                 echo ", " . htmlspecialchars($line);
            }
            echo "</p>";
        }
        exit;
    }
}
?>