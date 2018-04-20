    <?php

require '../../db/db.php';
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_POST["x"], false);


    //Fetching data
    $rescueType = $obj->rescueType;
    $rescueName = htmlentities($obj->rescueName);
    $mobileNo   = $obj->mobileNo;
    $phoneNo    = $obj->phoneNo;
    $address    = htmlentities($obj->address);
    $city       = htmlentities($obj->city);
    $pincode    = $obj->pincode;
    $state      = htmlentities($obj->state);
    $latitude   = $obj->latitude;
    $longitude  = $obj->longitude;
    
    //CHECK CONDITIONS--------------------------------------------------
    if($rescueType == "Hospital"){
        $table = "hospital";
    }elseif($rescueType == "Police Station"){
        $table = "policestation";
    }elseif($rescueType == "Civil Office"){
        $table = "civiloffice";
    }

    $contactNo = '"Mobile" : "'.$mobileNo.'", "Phone" : "'.$phoneNo.'"';



    //PREPARE QUERY-----------------------------------------------------
    $sql = "INSERT INTO $table (centerName, locLatitude, locLongitude,
                                contactNo, address,city,
                                pincode, state
                                )
                        VALUES (
                            :rescueName, :latitude, :longitude,
                            :contactNo, :address, :city,
                            :pincode, :state
                        )";

try{
    //Get DB Object........
    $db = new db();
    
    //Connect............
    $db = $db->connect();

    //Prepared statement.......
    $stmt = $db->prepare($sql);
    
    //Binding values............
    $stmt->bindParam(':rescueName', $rescueName);
    $stmt->bindParam(':latitude', $latitude);
    $stmt->bindParam(':longitude', $longitude);
    $stmt->bindParam(':contactNo', $contactNo);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':pincode', $pincode);
    $stmt->bindParam(':state', $state);
    $stmt->execute();

    echo '{ "Status":"Success", "Message":"Registred :)"}';
    $resObj[] = array(
        'Status' => 'Success',
        'Message' => 'Registered :)'
    );
   // $responce = '"Status":"Success","Message":"Registration successfull"';
    //echo "<h1>hello</h1>";
} catch(PDOException $e){
    echo '{ "Status":"Failure", "Message":"Some error occured :("}';
}

?>