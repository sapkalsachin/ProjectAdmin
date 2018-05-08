(function($){

    //CALLING getNotifications() function
    getNotifications();
})(jQuery);
var responce;
function getNotifications(){
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                 window.response = JSON.parse(this.responseText);
                if(response["Status"] == "Success"){
                    document.getElementById("ringerContainer").hidden = false;
                    document.getElementById("tempEmDistance").innerHTML = "Distance : "+response.Message["travelTime"];
                    document.getElementById("tempTravelTime").innerHTML = "Travel Time : "+response.Message["distance"];
                    document.getElementById("tempEmTime").innerHTML = response.Message["timeDate"];
                    document.getElementById("tempEmLocation").innerHTML = response.Message["location"];
                    document.getElementById("tempEmOwner").innerHTML = response.Message["ownerName"];
                    document.getElementById("tempEmMobile").innerHTML = "7777888899";
                    

                    //To display map
                    mapDiv = document.getElementById("tempMap");
                    origin = {lat: response.Message.source["lat"], lng: response.Message.source["lng"]};
                    destination = {lat: response.Message.destination["lat"], lng: response.Message.destination["lng"]};
                    initMap(mapDiv, origin, destination);
                }else{
                    alert(response["Status"]);
                }
            }
        };
        var url = "php/getNotifications.php";
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
    }

function showCurrentEmergency(){

}


function notificationAction(){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             window.response = JSON.parse(this.responseText);
            if(response["Status"] == "Success"){
                document.getElementById("ringerContainer").hidden = false;
                document.getElementById("tempEmDistance").innerHTML = "Distance : "+response.Message["travelTime"];
                document.getElementById("tempTravelTime").innerHTML = "Travel Time : "+response.Message["distance"];
                document.getElementById("tempEmTime").innerHTML = response.Message["timeDate"];
                document.getElementById("tempEmLocation").innerHTML = response.Message["location"];
                document.getElementById("tempEmOwner").innerHTML = response.Message["ownerName"];
                document.getElementById("tempEmMobile").innerHTML = "7777888899";
                

                //To display map
                mapDiv = document.getElementById("tempMap");
                origin = {lat: response.Message.source["lat"], lng: response.Message.source["lng"]};
                destination = {lat: response.Message.destination["lat"], lng: response.Message.destination["lng"]};
                initMap(mapDiv, origin, destination);
            }else{
                alert(response["Status"]);
            }
        }
    };
    var url = "php/getNotifications.php";
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();


}