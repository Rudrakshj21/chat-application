<?php
require_once('utils/functions.php');
require_once('utils/db_connect.php');
if ($_SERVER['REQUEST_METHOD'] != "POST") {
    response('Post method only.');
}




$login_email = $_POST['login_email'];
$login_password = $_POST['login_password'];

if (empty($login_email) || empty($login_password)) {
    response("One or more fields are empty");
}


$pdo = getPDO();

try {
    $stmt = $pdo->prepare("SELECT * from customers where email = :mail and password = :pwd");
    $stmt->bindParam('mail', $login_email);
    $stmt->bindParam('pwd', $login_password);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $token = uniqid();
        $token_set =  setToken($token, $login_email, $login_password);
        if ($token_set) {

            response("user authorized...generated token", true, $token);
        } else {
            response("could not set token.....");
        }
    } else {
        http_response_code(401);
        response('failed...to authorize...');
    }
} catch (Exception $e) {
    response("db error when logging user" . $e->getMessage());
}
