<?php
$words = file("words-1.txt");
$vowels = [];
foreach ($words as $word) {
    $count = preg_match_all("/[aeiouAEIOU]/", $word);
    if (!isset($vowelMap[$count]))
        $vowelMap[$count] = [];
    $vowelMap[$count][] = $word;
}
echo json_encode($vowelMap);
?>