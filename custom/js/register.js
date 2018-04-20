  //FORM VALIDATION

  function validateForm(){
  
    //VALIDATION VARIABLES
    var rescueNameValid = contactNoValid = mobileNoValid = addressValid = cityValid = stateValid = locationValid = true;

    //CHECKING RESCUE CENTER TYPE................
        var rescueType = document.getElementById("rescueType");
    //CHECKING RESCUE CENTER NAME................
    var rescueName = document.getElementById("rescueName");
    if(rescueName.value == ""){
        document.getElementById("rescueNameErr").innerHTML = "Please fill the required field!";
        rescueNameValid = false;
    }else{
        document.getElementById("rescueNameErr").innerHTML = "";
        rescueNameValid = true;
    }

    //CHECKING CONTACT NUMBER....................
      var mobileNo = document.getElementById("mobileNo");
      var contactNo = document.getElementById("contactNo");
  
    if( contactNo.value == "" && mobileNo.value ==""){
        document.getElementById("contactErr").innerHTML = "Please provide atleast one contact number!";
        contactNoValid = false;
    }else if(contactNo.value == "" && !mobileNo.value ==""){
        if(isNaN(mobileNo.value) || ! /^\d{10}$/.test(mobileNo.value)){
        document.getElementById("contactErr").innerHTML = "Enter valid mobile number !";
        mobileNoValid = false;
    }else{
        document.getElementById("contactErr").innerHTML = "";
        mobileNoValid = true;
    }
    }else if(!contactNo.value == "" && mobileNo.value ==""){
        if(isNaN(contactNo.value)){
            document.getElementById("contactErr").innerHTML = "Enter valid contact number !";
            contactNoValid = false;
        }else{
        document.getElementById("contactErr").innerHTML = "";
         contactNoValid = true;
        }
    }else if(!(contactNo.value == "" && mobileNo.value =="")){
        mobileNoValid = true;
        contactNoValid = true;
    }

    // if(mobileNo.value == "" && contactNo == "" ){
    //     document.getElementById("contactErr").innerHTML = "This field can't be empty !";
    // }else if(isNaN(contactNo.value) || ! /^\d{10}$/.test(contactNo.value)){
    //     document.getElementById("contactErr").innerHTML = "Enter valid phone number !";
    //     contactNo.focus();
    // }else{
    //     document.getElementById("contactErr").innerHTML = "";
    // }

    //CHECKING ADDRESS............................
    var address = document.getElementById("address");
    if(address.value == ""){
        document.getElementById("addressErr").innerHTML = "Enter valid address so we could contact you !";
        addressValid = false;
    }else{
        document.getElementById("addressErr").innerHTML = "";
        addressValid = true;
    }

    //CHECKING CITY..............................
    var city = document.getElementById("city");
    if(city.value == ""){
        document.getElementById("cityErr").innerHTML = "Enter a valid city!";
        cityValid = false;
    }else{
        document.getElementById("cityErr").innerHTML = "";
        cityValid =  true;
    }

    //CHECKING PINCODE............................
    var pin = document.getElementById("pincode");
    if(pin.value == "" || isNaN(pin.value) || ! /^\d{6}$/.test(pin.value)){
        document.getElementById("pincodeErr").innerHTML = "Enter a valid pincode!";
        pinValid = false;
    }else{
        document.getElementById("pincodeErr").innerHTML = "";
        pinValid = true;
    }
    
    //CHECKING STATE..............................
    var state = document.getElementById("state");
    if(state.value == ""){
        document.getElementById("stateErr").innerHTML = "Enter a valid state!";
        stateValid = false;
    }else{
        document.getElementById("stateErr").innerHTML = "";
        stateValid = true;
    }

    //CHECKING COORDINATES.......................
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    if(latitude.value == "" || longitude.value == ""){
        document.getElementById("locationErr").innerHTML="Please click the button to detect the loaction";
        locationValid = false;
    }else{
        locationValid = true;
    }

    //SEND TO SERVER.............................
    if(rescueNameValid && contactNoValid && mobileNoValid && addressValid && cityValid && stateValid && locationValid){
       var obj = {
                "rescueType" : rescueType.value,
                "rescueName" : rescueName.value,
                "mobileNo"  :  mobileNo.value,
                "phoneNo" :  contactNo.value,
                "address"   :  address.value,
                "city"      :  city.value,
                "pincode"   :   pin.value,
                "state"     :   state.value,
                "latitude" :   latitude.value,
                "longitude" :   longitude.value
            };
       showLoader();
        registerOnServer(obj);
    }else{
            //alert("err hai");
    }
}


//AJAX REQUEST HANDLER--------------------------------------------
function registerOnServer(obj){
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            
            document.getElementById("message").innerHTML = myObj["Message"];
        }
    };
    var url = "php/registerRescueCenter.php";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);

}

 function showLoader(){
     var hide = document.getElementById("mainForm");
     hide.hidden = true;

    var show = document.getElementById("loader");
    show.hidden = false;
}