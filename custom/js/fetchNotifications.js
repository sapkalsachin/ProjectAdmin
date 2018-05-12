(function($){

    //CALLING getNotifications() function
    getNotifications();
})(jQuery);
var responce;
window.lastId = 0;
window.arrIndex = 0;
var globalResponse = new Array();
var intervalClearance = true;


//Funtion That will fetch notifications----------------------
function getNotifications(){
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                 window.response = JSON.parse(this.responseText);
                if(response["Status"] == "Success"){
                    count = response.totalRows;
                    // alert(count);

                    if(window.lastId == 0){
                        for(var i=0; i<count; i++){
                                if(response.row[i].response == "Sent"){
                                    action = "<b>View<b>";
                                    cls = "text-success"
                                }else{
                                    action = "Viewed";
                                    cls = "text-muted"
                                }

                                // console.log("array index "+arrIndex);

                                rowObj = {
                                    emergencyType : response.row[i].Message.emergencyType,
                                    location : response.row[i].Message.location,
                                    timeDate : response.row[i].Message.timeDate,
                                    distance : response.row[i].Message.distance,
                                    travelTime : response.row[i].Message.travelTime,                                    
                                    ownerName : response.row[i].Message.ownerName,
                                    mobNo : response.row[i].Message.mobNo,
                                    ownerAddress : response.row[i].Message.ownerAddress,

                                    srcLat : response.row[i].Message.source.lat,
                                    srcLng : response.row[i].Message.source.lng,
                                    destLat : response.row[i].Message.destination.lat,
                                    destLng : response.row[i].Message.destination.lng,
                                    vehicalNo : response.row[i].Message.carNo,
                                    vehicalColor : response.row[i].Message.carColor,
                                    vehicalModel : response.row[i].Message.carModel,
                                    id : response.row[i].id,
                                    resp : response.row[i].response


                                }

                                window.globalResponse[arrIndex] = rowObj;
                                



                                tableRow = '<tr>'+
                                                '<td class="text-center '+cls+'">'+response.row[i].Message.emergencyType+'</td>'+
                                                '<td class="text-center '+cls+'">'+response.row[i].Message.location+'</td>'+
                                                '<td class="text-center '+cls+'">'+response.row[i].Message.timeDate+'</td>'+
                                                '<td class="text-center '+cls+'">'+response.row[i].Message.distance+'</td>'+
                                                '<td class="text-center '+cls+'">'+response.row[i].Message.travelTime+'</td>'+
                                                '<td class="text-center '+cls+'">'+response.row[i].Message.ownerName+'</td>'+
                                                '<td class="text-center '+cls+'">'+response.row[i].Message.mobNo+'</td>'+
                                                '<td class="text-center '+cls+' btn btn-link"  onclick="showOnMap('+arrIndex+')">'+action+'</td>'+
                                            '</tr>';
                                $("#emLogTbody").append(tableRow);
                                window.arrIndex ++;
                                // console.log("inc kiya hhua arrindexx"+arrIndex);
                        }
                    }else{
                        for(var j= (count-1); j>=0; j--){
                            if(response.row[j].response == "Sent"){
                                action = "<b>View<b>";
                                cls = ""
                            }else{
                                action = "Viewed";
                                cls = "text-muted"
                            }

                            rowObj = {
                                emergencyType : response.row[j].Message.emergencyType,
                                location : response.row[j].Message.location,
                                timeDate : response.row[j].Message.timeDate,
                                distance : response.row[j].Message.distance,
                                travelTime : response.row[j].Message.travelTime,                                    
                                ownerName : response.row[j].Message.ownerName,
                                mobNo : response.row[j].Message.mobNo,
                                ownerAddress : response.row[j].Message.ownerAddress,

                                srcLat : response.row[j].Message.source.lat,
                                srcLng : response.row[j].Message.source.lng,
                                destLat : response.row[j].Message.destination.lat,
                                destLng : response.row[j].Message.destination.lng,
                                vehicalNo : response.row[j].Message.carNo,
                                vehicalColor : response.row[j].Message.carColor,
                                vehicalModel : response.row[j].Message.carModel,
                                id : response.row[j].id,
                                resp : response.row[j].response


                            }

                            window.globalResponse[arrIndex] = rowObj;
                            


                            tableRow = '<tr>'+
                                            '<td class="text-center '+cls+'">'+response.row[j].Message.emergencyType+'</td>'+
                                            '<td class="text-center '+cls+'">'+response.row[j].Message.location+'</td>'+
                                            '<td class="text-center '+cls+'">'+response.row[j].Message.timeDate+'</td>'+
                                            '<td class="text-center '+cls+'">'+response.row[j].Message.distance+'</td>'+
                                            '<td class="text-center '+cls+'">'+response.row[j].Message.travelTime+'</td>'+
                                            '<td class="text-center '+cls+'">'+response.row[j].Message.ownerName+'</td>'+
                                            '<td class="text-center '+cls+'">'+response.row[j].Message.mobNo+'</td>'+
                                            '<td class="text-center '+cls+' btn btn-link" onclick="showOnMap('+arrIndex+')">'+action+'</td>'+
                                        '</tr>';
                            $("#emLogTbody").prepend(tableRow);
                            window.arrIndex++;
                    }
                    }
                    window.lastId = response.row[0].id; //last id dikhataa hai table ka.                    
                }else{
                    //alert(response["Status"]);
                }
                setTimeout(getNotifications, 3000);
            }
        };
        var url = "php/getPsCvoffNotifications.php?lastId="+window.lastId;
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
}


//Function that will send response to server-----------------
// function notificationAction(id){
//     window.intervalClearance = false;
//     xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var response = JSON.parse(this.responseText);
//             if(response["Status"] == "Accepted"){
//                 document.getElementById("responseModalTitle").innerHTML = response["Title"];
//                 document.getElementById("responseModalTitle").style.color = "green";
//                 document.getElementById("responseModalBody").innerHTML = response["Message"];
//                 $("#responseModal").modal();
//             }else if(response["Status"] == "Rejected"){
//                 document.getElementById("responseModalTitle").innerHTML = response["Title"];
//                 document.getElementById("responseModalTitle").style.color = "red";
//                 document.getElementById("responseModalBody").innerHTML = response["Message"];
//                 $("#responseModal").modal();

//             }


//         }
//     };
//     var url = 'php/getPsCvoffNotifications.php?Id='+id;
//     xhttp.open("GET", url, true);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.send();


// }





//FUNCTION TO SHOW MAIN DETAILS------------------------------

function showOnMap(index){
    
    alert("from show on map : "+index);
    console.log("srclat : "+window.globalResponse[index].srcLat);
    console.log("srclng : "+window.globalResponse[index].srcLng);
    console.log("destlat : "+window.globalResponse[index].destLat);
    console.log("destlat : "+window.globalResponse[index].destLng);
    
    //To display map
        mapDiv = document.getElementById("mainMap");
        origin = {lat: window.globalResponse[index].srcLat, lng: window.globalResponse[index].srcLng};
        destination = {lat: window.globalResponse[index].destLat, lng: window.globalResponse[index].destLng};
        initMap(mapDiv, origin, destination);
        document.getElementById("mainDistance").innerHTML = window.globalResponse[index].distance;
        document.getElementById("mainTravelTime").innerHTML = window.globalResponse[index].travelTime;


    // //To show main table
    document.getElementById("situation").innerHTML = window.globalResponse[index].emergencyType;
    document.getElementById("mainLocation").innerHTML = window.globalResponse[index].location;
    document.getElementById("mainTime").innerHTML = window.globalResponse[index].timeDate;
    document.getElementById("ownerName").innerHTML = window.globalResponse[index].ownerName;
    document.getElementById("mainMobile").innerHTML = window.globalResponse[index].mobNo;
    document.getElementById("carNo").innerHTML = window.globalResponse[index].vehicalNo;
    document.getElementById("carColor").innerHTML = window.globalResponse[index].vehicalColor;
    document.getElementById("carModel").innerHTML = window.globalResponse[index].vehicalModel;
     
 }