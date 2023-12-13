<?php
require_once('utils/functions.php');
require_once('utils/db_connect.php');
if ($_SERVER['REQUEST_METHOD'] != "POST") {
    response('Post method only.');
}




$token = $_POST['token'];
if (empty($token)) {
    response("One or more fields are empty");
}




try {
    $pdo = getPDO();
    $stmt = $pdo->prepare("SELECT avatar from  customers WHERE token = :token");
    $stmt->bindParam('token', $token);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        response("image fetched from db successfully", true, $stmt->fetch(PDO::FETCH_ASSOC));
    } else {
        response("image could not be fetched into db ");
    }
} catch (Exception $e) {
    response("db error when fetching image " . $e->getMessage());
}
