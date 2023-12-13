<?php
require_once('utils/functions.php');
require_once('utils/db_connect.php');
if ($_SERVER['REQUEST_METHOD'] != "POST") {
    response('Post method only.');
}



// var_dump($_POST);
$token = $_POST['token'];
$message = $_POST['message'];
$receiver_id = $_POST['id'];
if (empty($token) || empty($message) || empty($receiver_id)) {
    response("One or more fields are empty");
}



$sender_id = get_sender_id($token);

// echo gettype($sender_id);
// exit();
// response("TEst", true, [$sender_id, $receiver_id, $message]);
try {
    $pdo = getPDO();
    $stmt = $pdo->prepare("INSERT INTO message (sender_id,receiver_id,message) values(:sid,:rid,:msg)");
    $stmt->bindParam('sid', $sender_id);
    $stmt->bindParam('rid', $receiver_id);
    $stmt->bindParam('msg', $message);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        response("message inserted into db successfully", true);
    } else {
        response("message could not be inserted into db ");
    }
} catch (Exception $e) {
    response("db error when inserting message " . $e->getMessage());
}
