<?php
// Minimal WordPress theme loader: serve the static index.html if it exists.
// This keeps WordPress happy (style.css + index.php required).
$static = __DIR__ . '/index.html';
if (file_exists($static)) {
    echo file_get_contents($static);
    exit;
}
?>
<html><body><h1>OLON Sentiment TV</h1><p>Please add static files to this theme folder.</p></body></html>
