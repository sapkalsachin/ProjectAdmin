(function($){

    //CALLING getNotifications() function
    getNotifications();
})(jQuery);
var responce;
var lastId;
var intervalClearance = true;
function getNotifications(){
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                 window.response = JSON.parse(this.responseText);
                if(response["Status"] == "Success"){
                    if(response['id'] == window.lastId){
                    }else{
                        document.getElementById("ringerContainer").hidden = false;
                        document.getElementById("tempEmDistance").innerHTML = "Distance : "+response.Message["travelTime"];
                        document.getElementById("tempTravelTime").innerHTML = "Travel Time : "+response.Message["distance"];
                        document.getElementById("tempEmTime").innerHTML = response.Message["timeDate"];
                        document.getElementById("tempEmLocation").innerHTML = response.Message["location"];
                        document.getElementById("tempEmOwner").innerHTML = response.Message["ownerName"];
                        document.getElementById("tempEmMobile").innerHTML = response.Message["mobNo"];
                        document.getElementById("acceptButton").disabled = false;
                        document.getElementById("rejectButton").disabled = false;
                        window.lastId = response["id"];

                        //To display map
                        mapDiv = document.getElementById("tempMap");
                        origin = {lat: response.Message.source["lat"], lng: response.Message.source["lng"]};
                        destination = {lat: response.Message.destination["lat"], lng: response.Message.destination["lng"]};
                        initMap(mapDiv, origin, destination);
                        window.intervalClearance = true;
                        counter();
                    }
                }else{
                    // alert(response["Status"]);
                }
                setTimeout(getNotifications, 3000);
            }
        };
        var url = "php/getNotifications.php";
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
    }



function notificationAction(action){
    window.intervalClearance = false;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if(response["Status"] == "Accepted"){
                document.getElementById("responseModalTitle").innerHTML = response["Title"];
                document.getElementById("responseModalTitle").style.color = "green";
                document.getElementById("responseModalBody").innerHTML = response["Message"];
                $("#responseModal").modal();
            }else if(response["Status"] == "Rejected"){
                document.getElementById("responseModalTitle").innerHTML = response["Title"];
                document.getElementById("responseModalTitle").style.color = "red";
                document.getElementById("responseModalBody").innerHTML = response["Message"];
                $("#responseModal").modal();

            }

            document.getElementById("acceptButton").disabled = true;
            document.getElementById("rejectButton").disabled = true;
            alert("called me");

            setTimeout(function(){
            var hide = document.getElementById("ringerContainer").hidden = true;
            },1000);
            //clearTimeout(hide);
            showMainDetails();

        }
    };
    var url = 'php/getNotifications.php?Id='+window.response["id"]+'&Action='+action;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();


}



//COUNTER FUNCTION TO SHOW COUNTER AND AUTO REJECTION

function counter(){
    var seconds = 30;
// Update the count down every 1 second
    var x = setInterval(function() {

    // Output the result in an element with id="countDown"
    document.getElementById("countDownContainer").innerHTML = "Auto rejects in "+ seconds +" Sec" ;
    seconds -=1;
    // If the count down is over, write some text 
    if (seconds == 0 && window.intervalClearance == true) {
        notificationAction("Reject");
        document.getElementById("countDownContainer").innerHTML = "Response sent";
        clearInterval(x);
        return;
    }else if(window.intervalClearance == false){
        document.getElementById("countDownContainer").innerHTML = "Response sent";
        clearInterval(x);
        return;
    }
}, 1000);
}



//FUNCTION TO SHOW MAIN DETAILS
 function showMainDetails(){
        alert("me too");
        alert(window.response["Status"]);
    //To display map
        mapDiv = document.getElementById("mainMap");
        origin = {lat: response.Message.source["lat"], lng: response.Message.source["lng"]};
        destination = {lat: response.Message.destination["lat"], lng: response.Message.destination["lng"]};
        initMap(mapDiv, origin, destination);
        document.getElementById("mainDistance").innerHTML = window.response.Message["distance"];
        document.getElementById("mainTravelTime").innerHTML = window.response.Message["travelTime"];


    //To show main table
    document.getElementById("situation").innerHTML = window.response.Message["emergencyType"];
    document.getElementById("mainLocation").innerHTML = window.response.Message["location"];
    document.getElementById("mainTime").innerHTML = window.response.Message["timeDate"];
    document.getElementById("ownerName").innerHTML = window.response.Message["ownerName"];
    document.getElementById("mainMobile").innerHTML = window.response.Message["mobNo"];
    document.getElementById("carNo").innerHTML = window.response.Message["carNo"];
    document.getElementById("carColor").innerHTML = window.response.Message["carColor"];
    document.getElementById("carModel").innerHTML = window.response.Message["carModel"];
     
 }