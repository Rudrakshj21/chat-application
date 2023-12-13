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


$pdo = getPDO();

try {
    $stmt = $pdo->prepare("SELECT name FROM customers WHERE token = :token");
    $stmt->bindParam('token', $token);

    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        response('GOT USERNAME FROM db', true, $stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        response('DID NOT GET USERNAME FROM db failed');
    }
} catch (Exception $e) {
    response("db error when FETCHING  user NAME" . $e->getMessage());
}
