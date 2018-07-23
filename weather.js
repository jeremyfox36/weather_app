//User Story: I can see the weather in my current location.
//User Story: I can see a different icon or background image //(e.g. snowy mountain, hot desert) depending on the weather.
//User Story: I can push a button to toggle between Fahrenheit and Celsius.
//get users current location

window.onload = getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getWeather(position){
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  loadDoc(lat, lon);
  
}

function loadDoc(lat, lon) {
    var xhttp = new XMLHttpRequest();
    var units = "";
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var thing = JSON.parse(this.responseText);
            console.log(thing);
            document.getElementById("location").textContent = thing["name"];
            document.getElementById("description").textContent = thing["weather"][0]["description"];
            document.getElementById("icon").src = thing["weather"][0]["icon"];
            document.getElementById("temp").textContent = thing["main"]["temp"];
            document.getElementById("tempUnits").textContent = "C";

       }
    };
    xhttp.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon, true);
    xhttp.send(); 
}

function convertTemp(){
  //convert from C to F and vice versa
  var tempHolder = document.getElementById("temp");
  var tempUnitsHolder = document.getElementById("tempUnits");

  var temp = Number(tempHolder.textContent);
  var units = tempUnitsHolder.textContent;

  if(units === "C"){
    let f = temp * 1.8 + 32;
    tempHolder.textContent = f.toFixed(2);
    tempUnitsHolder.textContent = "F";

  } else if(units === "F"){
    let c = (temp - 32) / 1.8;
    tempHolder.textContent = c.toFixed(2);
    tempUnitsHolder.textContent = "C";
  }
}