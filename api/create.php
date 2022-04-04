<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

//var_dump($request);
  

  // Sanitize.
  $nom = mysqli_real_escape_string($con, trim($request->nom));
  $prenom = mysqli_real_escape_string($con, trim($request->prenom));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $telephone = mysqli_real_escape_string($con, trim($request->telephone));


  // Create.
  $sql = "INSERT INTO `users`(`nom`,`prenom`,`email`,`telephone`) VALUES ('{$nom}','{$prenom}','{$email}','{$telephone}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $user = [
      'nom' => $nom,
      'prenom' => $prenom,
      'email' => $email,
      'telephone' => $telephone,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($user);
  }
  else
  {
    http_response_code(422);
  }
}