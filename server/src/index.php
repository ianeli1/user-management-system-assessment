<?php
$valid_url = "http://localhost:3000";
header("Access-Control-Allow-Origin: $valid_url");
header("Access-Control-Allow-Methods: GET,POST");

function getDotEnv() {
    $file = fopen(realpath("../.env"), "r");
    while ($val = fgets($file)) {
        putenv(trim($val));
    }
    fclose($file);
}

function getDatabaseConnection() {
    return new PDO(getenv("CONN_STRING"), getenv("USER"), getenv("PASSWORD"));
}

function getUsers($page) {
    $db = getDatabaseConnection();
    $query = $db->query("SELECT id, firstName, lastName, dateOfBirth FROM users LIMIT 20 OFFSET " . ($page * 20));
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function addUser($fName, $lName, $dob) {
    $db = getDatabaseConnection();
    return $db->prepare("INSERT INTO users(firstName, lastName, dateOfBirth) VALUES (?,?,?)")->execute([$fName, $lName, $dob]);
}

function deleteUser($id) {
    $db = getDatabaseConnection();
    return $db->prepare("DELETE FROM users WHERE id = ?")->execute([$id]);
}

function updateUser($id, $fName, $lName, $dob) {
    if (!$id) {
        throw new Exception("An id must be provided");
    }
    if (!$fName) {
        $fName = "";
    }
    if (!$lName) {
        $lName = "";
    }
    if (!$dob) {
        $dob = "";
    }
    $db = getDatabaseConnection();
    return $db->prepare("UPDATE users SET firstName = IF(LENGTH(?) = 0, firstName, ?), lastName = IF(LENGTH(?) = 0, lastName, ?), dateOfBirth = IF(LENGTH(?) = 0, dateOfBirth, ?) WHERE id = ?")->execute([$fName, $fName, $lName, $lName, $dob, $dob, $id]);
}

getDotEnv();
//remove everything after ? (parameters) and the first character (/)
$path = substr(explode("?", $_SERVER["REQUEST_URI"])[0], 1);
$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET" && $path == "getUsers") {
    $page = $_GET["page"] ?? 0;
    echo json_encode(getUsers($page));
} else if ($method == "POST") {
    $user = new stdClass();
    $user->id = $_POST["id"];
    $user->fname = $_POST["fName"];
    $user->lname = $_POST["lName"];
    $user->dob = $_POST["dBirth"];
    switch ($path) {
        case "addUser": {
                if ($user->fname && $user->lname && $user->dob && addUser($user->fname, $user->lname, $user->dob)) {
                    //HTTP created
                    http_response_code(201);
                    echo json_encode($user);
                } else {
                    //bad request
                    http_response_code(400);
                }
            }
            break;
        case "updateUser": {
                if (updateUser($user->id, $user->fname, $user->lname, $user->dob)) {
                    http_response_code(202);
                    echo json_encode($user);
                }
            }
            break;
        case "deleteUser": {
                if (deleteUser($user->id)) {
                    http_response_code(200);
                    echo json_encode($user);
                }
            }
            break;
        default: {
                http_response_code(400);
            }
    }
} else {
    //bad request
    http_response_code(400);
}
