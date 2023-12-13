<?php
require_once('utils/functions.php');
require_once('utils/db_connect.php');
if ($_SERVER['REQUEST_METHOD'] != "POST") {
    response('Post method only.');
}



// var_dump($_POST);
$img = $_POST['img'];
$token = $_POST['token'];
if (empty($img) || empty($token)) {
    response("One or more fields are empty");
}




try {
    $pdo = getPDO();
    $stmt = $pdo->prepare("UPDATE customers SET avatar = :img WHERE token = :token");
    $stmt->bindParam('token', $token);
    $stmt->bindParam('img', $img);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        response("image inserted into db successfully", true);
    } else {
        response("image could not be inserted into db ");
    }
} catch (Exception $e) {
    response("db error when inserting image " . $e->getMessage());
}
