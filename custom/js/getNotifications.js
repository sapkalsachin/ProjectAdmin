(function($){

    //CALLING getNotifications() function
    getNotifications();
})(jQuery);
var responce;
var lastId;
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
                        document.getElementById("tempEmMobile").innerHTML = "7777888899";
                        
                        window.lastId = response["id"];

                        //To display map
                        mapDiv = document.getElementById("tempMap");
                        origin = {lat: response.Message.source["lat"], lng: response.Message.source["lng"]};
                        destination = {lat: response.Message.destination["lat"], lng: response.Message.destination["lng"]};
                        initMap(mapDiv, origin, destination);
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

function showCurrentEmergency(){

}


function notificationAction(action){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             window.response = JSON.parse(this.responseText);
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

        }
    };
    var url = 'php/getNotifications.php?Id='+window.response["id"]+'&Action='+action;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();


}

function counter(){
    var seconds = 30;
// Update the count down every 1 second
    var x = setInterval(function() {

    // Output the result in an element with id="countDown"
    document.getElementById("countDown").innerHTML = seconds + "s ";
    		seconds -=1;
    // If the count down is over, write some text 
    if (seconds == 0) {
        clearInterval(x);
        document.getElementById("countDown").innerHTML = seconds + "s ";
        notificationAction("Reject");
    }
}, 1000);
}