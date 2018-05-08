<?php

//SESSION KA KAAM BAKI HAI--------

    require("../../db/db.php");
    if(isset($_GET["Id"]) && isset($_GET["Action"])){
        notificationAction($_GET["Id"], $_GET["Action"]);
    }

    //$rescueCenterId = $_SESSION["rescueCenterId"];
    $rescueCenterId = "hosp4";

    getNotification($rescueCenterId);

    function getNotification($rescueCenterId)
    {
        //PREPARE QUERY-----------------------------------------------------
     
            $sql = 'SELECT * FROM notifications WHERE rescueid = :rescueid && response = "Pending"';
  
            try{
            //Get DB Object........
            $db = new db();
            //Connect............
            $db = $db->connect();

            //Prepared statement.......
            $stmt = $db->prepare($sql);

            //Binding values............    
            $stmt->bindParam(':rescueid', $rescueCenterId);
            //$stmt->bindParam(':tableName', $tableName);
            $stmt->execute();
            if($data = $stmt->fetchAll()){
                //return $data["response"];
                foreach ($data as $row) {
                        $message = $row['message'];
                        echo'{"Status":"Success", "Message":'.$message.', "id":'.$row["id"].'}';
                }
            }else{
                echo'{"Status":"Failure", "Message":"There are no notifications for you right you."}';
            }
            } catch(PDOException $e){
                // echo $e;
                echo'{"Status":"Failure", "Message" : "Something went wrong while fetching notifications."}';
            }


    }


    function notificationAction($id, $response){
        $select = 'SELECT * FROM notifications WHERE id = :id';
        $update = 'UPDATE notifications SET response = :response WHERE id = :id';
  
        try{
        //Get DB Object........
        $db = new db();
        //Connect............
        $db = $db->connect();

        //Prepared statement.......
        $stmt = $db->prepare($select);
        $stmt1 = $db->prepare($update);

        //Binding values............    
        $stmt->bindParam(':id', $id);
        $stmt1->bindParam(':id', $id);
        
        //$stmt->bindParam(':tableName', $tableName);
        $stmt->execute();
        if($data = $stmt->fetchAll()){
            //return $data["response"];
            foreach ($data as $row) {
                if($row["response"] == "Timeout"){
                    echo'{"Status":"Failure", "Message":"Oops. You got late to respond :("}';
                    die();
                }elseif($row["response"] == "Pending"){
                    $response = "Accepted";
                    $stmt1->bindParam(':response', $response);
                    $stmt1->execute();
                    echo'{"Status":"Success", "Message":"Thank you so much for helping :)"}';
                    die();
                }
            }

        }else{
            echo'{"Status":"Failure", "Message":"I think there is something wrong with this emergency"}';
            die();
        }
        } catch(PDOException $e){
            // echo $e;
            echo'{"Status":"Failure", "Message" : "Something went wrong while performing action. Please contact the needy manually."}';
            die();
        }

    }

