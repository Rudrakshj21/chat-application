<?php
require_once('utils/functions.php');
require_once('utils/db_connect.php');
if ($_SERVER['REQUEST_METHOD'] != "POST") {
    response('Post method only.');
}



// var_dump($_POST);
$token = $_POST['token'];
$receiver_id = $_POST['id'];
if (empty($token) ||  empty($receiver_id)) {
    response("One or more fields are empty");
}



$sender_id = get_sender_id($token);

// echo gettype($sender_id);
// exit();
// response("TEst", true, [$sender_id, $receiver_id, $message]);
try {
    $pdo = getPDO();
    $stmt = $pdo->prepare("SELECT  * FROM  message WHERE sender_id = :sid AND receiver_id = :rid  OR sender_id = :rid AND receiver_id = :sid");
    $stmt->bindParam('sid', $sender_id);
    $stmt->bindParam('rid', $receiver_id);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        response("fetched previous conversations from db successfully", true, $stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        response("no previous conversation found from db ");
    }
} catch (Exception $e) {
    response("db error when inserting message " . $e->getMessage());
}
