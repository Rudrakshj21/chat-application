<?php
require_once('utils/functions.php');
require_once('utils/db_connect.php');
if ($_SERVER['REQUEST_METHOD'] != "POST") {
    response('Post method only.');
}

$reg_email = $_POST['reg_email'];
$reg_password = $_POST['reg_password'];
$reg_name = $_POST['reg_name'];

if (empty($reg_email) || empty($reg_password) || empty($reg_name)) {
    response("One or more fields are empty");
}


$pdo = getPDO();

try {
    $stmt = $pdo->prepare("INSERT INTO customers (name,email,password) values(:name,:mail,:pwd)");
    $stmt->bindParam('name', $reg_name);
    $stmt->bindParam('mail', $reg_email);
    $stmt->bindParam('pwd', $reg_password);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        response('registered in db', true, $stmt->fetchAll(PDO::FETCH_ASSOC));
    } else {
        response('registration in db failed');
    }
} catch (Exception $e) {
    response("db error when registering user" . $e->getMessage());
}
