<?php
/**
 * Returns the list of users.
 */
require 'database.php';

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$id)
{
  return http_response_code(400);
}

$sql = "SELECT * FROM users WHERE `id` ='{$id}' LIMIT 1";

if($result = mysqli_query($con,$sql))
{
  $row = mysqli_fetch_assoc($result);
    $users  = $row;

  echo json_encode($users);
}
else
{
  http_response_code(404);
}