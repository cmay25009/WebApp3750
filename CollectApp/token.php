<?php
$client_id = "970278baf7b646e79ad52496b85293a5";
$client_secret = "33adb6b48ab54f8fb5031955a09a998b";

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://accounts.spotify.com/api/token");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_USERPWD, $client_id . ":" . $client_secret);

$headers = [];
$headers[] = "Content-Type: application/x-www-form-urlencoded";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close($ch);

echo $result;
?>
