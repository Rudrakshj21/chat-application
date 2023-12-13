<?php
require_once('db_connect.php');
function response($msg = "", $status = false, $data = [])
{
    echo json_encode(['message' => $msg, 'status' => $status, 'data' => $data]);
    exit();
}

function setToken($token, $email, $password)
{
    $pdo = getPDO();
    try {

        $stmt = $pdo->prepare("UPDATE customers SET token = :token WHERE email = :mail AND password = :pwd");
        $stmt->bindParam("token", $token);
        $stmt->bindParam("mail", $email);
        $stmt->bindParam("pwd", $password);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    } catch (Exception $e) {
        response("db error when setting token..." . $e->getMessage());
    }
}

function get_sender_id($token)
{

    // echo "in sender id";
    // echo $token;
    try {
        $pdo = getPDO();
        $stmt = $pdo->prepare("SELECT id from customers where token = :token");
        $stmt->bindParam('token', $token);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC)['id'];
        } else {
            http_response_code(401);
            response("could not get user id....");
        }
    } catch (Exception $e) {
        response("db error when getting user id from token..." . $e->getMessage());
    }
}
