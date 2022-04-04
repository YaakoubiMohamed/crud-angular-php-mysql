<?php
/**
 * Returns the list of users.
 */
require 'database.php';

$users = [];
$sql = "SELECT * FROM users";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $users[$i]    = $row;
    $i++;
  }

  echo json_encode($users);
}
else
{
  http_response_code(404);
}