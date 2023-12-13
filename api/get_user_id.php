<?php
require_once('utils/functions.php');

if ($_SERVER['REQUEST_METHOD'] != "POST") {
    response('Post method only.');
}

$token = $_POST['token'];
if (empty($token)) {
    response("One or more fields are empty");
}
$user_id = get_sender_id($token);
response('found user id', true, $user_id);
