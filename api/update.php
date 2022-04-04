<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  

  // Sanitize.
  $id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

  $nom = mysqli_real_escape_string($con, trim($request->nom));
  $prenom = mysqli_real_escape_string($con, trim($request->prenom));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $telephone = mysqli_real_escape_string($con, trim($request->telephone));

  // Update.
  $sql = "UPDATE `users` SET `nom`='$nom',`prenom`='$prenom', `email`='$email', `telephone`= '$telephone' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}