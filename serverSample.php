<?php
$now = date("Y-m-d")." ".date("H:i:s");
$current = $now." > ";
if ($_SERVER["REQUEST_METHOD"] == "GET")  { $current .= "[G] ".json_encode($_GET); }
if ($_SERVER["REQUEST_METHOD"] == "POST")  { $current .= "[P] ".json_encode($_POST); }
$current .= "<br>".PHP_EOL;
$file = './myExtension.log';
file_put_contents($file, $current, FILE_APPEND | LOCK_EX);
?>
