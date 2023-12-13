<?php
require_once('utils/functions.php');
require_once('utils/db_connect.php');
if ($_SERVER['REQUEST_METHOD'] != "POST") {
    response('Post method only.');
}




$profile_name = $_POST['profileName'];

if (empty($profile_name)) {
    response(" empty name sent.....");
}


$pdo = getPDO();
$profile_name = $profile_name . '%';
$token = $_POST['token'];
$user_id = get_sender_id($token);

try {
    $stmt = $pdo->prepare("SELECT * from customers where name  like :name and id != :id ");
    $stmt->bindParam('name', $profile_name);
    $stmt->bindParam('id', $user_id);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        response('found users.....', true, $stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {

        response('cannot find users...');
    }
} catch (Exception $e) {
    response("db error when finding profiles " . $e->getMessage());
}
