<?php
/**
 * Global conversion counter for Conversion Wizard.
 *
 * Same-origin endpoint (no third party, no CORS needed). Stores a single
 * integer in counter.dat next to this file.
 *
 *   GET  /counter.php            -> { "total": N }        (read only)
 *   POST /counter.php?n=<1..50>  -> { "total": N + n }    (increment)
 *
 * Only a count is ever received — no image data, filenames, or personal info.
 * The increment is capped to the per-batch limit to blunt casual abuse.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$file = __DIR__ . '/counter.dat';
$fp = @fopen($file, 'c+');
if ($fp === false) {
  http_response_code(200);
  echo json_encode(array('total' => 0));
  exit;
}

flock($fp, LOCK_EX);
$raw = stream_get_contents($fp);
$current = (int) trim($raw);

$inc = 0;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $n = isset($_GET['n']) ? (int) $_GET['n'] : 1;
  if ($n < 1) { $n = 1; }
  if ($n > 50) { $n = 50; }
  $inc = $n;
}

$total = $current + $inc;

if ($inc > 0) {
  ftruncate($fp, 0);
  rewind($fp);
  fwrite($fp, (string) $total);
  fflush($fp);
}

flock($fp, LOCK_UN);
fclose($fp);

echo json_encode(array('total' => $total));
