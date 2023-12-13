<?php

function getPDO()
{
    $host = "localhost";
    $db_name = "chat";
    $dsn = "pgsql:host=$host;dbname=$db_name";
    $username = "postgres";
    $password = "root";
    try {
        $pdo = new PDO($dsn, $username, $password);
        return $pdo;
    } catch (Exception $e) {
        response("db connection error. " . $e->getMessage());
    }
}
