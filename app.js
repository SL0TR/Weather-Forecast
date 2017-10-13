// Get the URL in string format
function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

// Convert it into json and change DOM accordingly
function jsonMaker(b) {
  var parsedJ = JSON.parse(b);
  var summary = parsedJ.currently.summary;
  var temp = parsedJ.currently.temperature;
  var timeZ = parsedJ.timezone;
  var icon = parsedJ.currently.icon;
  temp = Math.floor(temp);

  document.querySelector(".timeZ").innerHTML = timeZ;
  skyCon(icon);
  document.querySelector(".w-info").innerHTML = summary;
  document.querySelector(".temp").innerHTML = temp + "&deg;c";
}

// Get current location in long and lat
function getLocation() {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  var lon = position.coords.latitude;
  var lat = position.coords.longitude;
  httpGetAsync(
    "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/4180b14d0ce80e1a97ccec5c6e67ca39/" +
      lon +
      "," +
      lat +
      "?exclude=monthly,hourly,daily,minutely,flags,alerts&units=ca",
    jsonMaker
  );
}
getLocation();


// Call Skycon icons from API
function skyCon(wthr) {
    document.querySelector(".icon").setAttribute("id", wthr);
    icons.set(wthr, Skycons.PARTLY_CLOUDY_NIGHT);
}




// SKYCONS!!
var icons = new Skycons({ color: "#3498db" });

icons.set("clear-day", Skycons.CLEAR_DAY);
icons.set("clear-night", Skycons.CLEAR_NIGHT);
icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
icons.set("cloudy", Skycons.CLOUDY);
icons.set("rain", Skycons.RAIN);
icons.set("sleet", Skycons.SLEET);
icons.set("snow", Skycons.SNOW);
icons.set("wind", Skycons.WIND);
icons.set("fog", Skycons.FOG);

icons.play();
