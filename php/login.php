<?php
//THIS CODE WILL ACCEPT DATA FROM LOGIN.HTML AND AUTHENTICATE....................................
require '../../db/db.php';
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_POST["x"], false);

echo "ip address".$_SERVER['REMOTE_ADDR'];
    //Fetching data
    $username = $obj->username;
    $password = $obj->password;
    $remember = $obj->remember;

    //Create query........................................
     $sql = "SELECT * FROM users WHERE username = :username && password = :password";

    try{
        //Get DB Object........
        $db = new db();
        
        //Connect............
        $db = $db->connect();

        //Prepared statement.......
        $stmt = $db->prepare($sql);
        
        //Binding values............
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
       
        $stmt->execute();
        $data = $stmt->fetchAll();
        if($data){
            echo '{ "Status":"Success"}';

        }else{
                echo '{ "Status":"Failure" }';
      
        }


    } catch(PDOException $e){
        echo '{ "Status":"Err" }';
    }

?>