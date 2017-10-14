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
  unixTime = parsedJ.currently.time;;
  var summary = parsedJ.currently.summary;
  temp = parsedJ.currently.temperature;
  var timeZ = parsedJ.timezone;
  var icon = parsedJ.currently.icon;
  var windSpeed = parsedJ.currently.windSpeed;
  var humidity = parsedJ.currently.humidity;
  humidity = humidity * 100;
  var pressure = parsedJ.currently.pressure;
  pressure = Math.floor(pressure);
  temp = Math.floor(temp);
  skyCon(icon);
  document.querySelector(".w-info").innerHTML = summary;
  document.querySelector(".temp").innerHTML = temp + "&deg;";
  document.querySelector('.windspeed').innerHTML = windSpeed;
  document.querySelector('.humidity').innerHTML = humidity;
  document.querySelector('.pressure').innerHTML = pressure;    
}
var b;
function currentDayTime() {
  var bg = document.querySelector('section');
  if (b > 19  || b < 4) {
    document.querySelector('.greeting').innerHTML = "It's Night time!";
    bg.style.backgroundImage = 'url(https://images.imgbox.com/1d/27/ac0ZUJ2X_o.jpg)';
  } else if (b > 4  || b < 12) {
    document.querySelector('.greeting').innerHTML = "It's Morning!";
    bg.style.backgroundImage = 'url(https://images.imgbox.com/0d/cc/EixB5djm_o.jpg)';
  } else if (b > 12  || b < 17 ) {
    document.querySelector('.greeting').innerHTML = "It's Afternoon!";
    bg.style.backgroundImage = 'url(https://images.imgbox.com/63/db/Gfc5An0h_o.jpg)';
  } else if (b > 17  || b < 7) {
    document.querySelector('.greeting').innerHTML = "It's Evening!";
    bg.style.backgroundImage = 'url(https://images.imgbox.com/30/32/SvlHZQoO_o.jpg)';
  }

}

setInterval(function() {

    var currentTime = new Date(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes(),
        ampm = hours > 11 ? 'PM' : 'AM';

    hours += hours < 10 ? '0' : '';
    minutes += minutes < 10 ? '0' : '';

    timeNow = hours + ":" + minutes + " " + ampm;
    document.querySelector('.current-time').innerHTML = timeNow;
    b = hours;
    currentDayTime();
}, 1000); 





// For ShowPosition2 
function jsonMaker2(c) {
  parsedJ2 = JSON.parse(c);
  cityName = parsedJ2.data[0].city_name;
  country = parsedJ2.data[0].country_code;
  document.querySelector('.location').innerHTML = cityName + ", " + country; 
}

// Get current location in long and lat
function getLocation() {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(showPosition);
}
var lon;
var lat;
function showPosition(position) {
   lon = position.coords.latitude;
   lat = position.coords.longitude;
  httpGetAsync(
    "https://cors.io/?https://api.darksky.net/forecast/4180b14d0ce80e1a97ccec5c6e67ca39/" +
      lon +
      "," +
      lat +
      "?exclude=monthly,hourly,daily,minutely,flags,alerts&units=ca",
    jsonMaker
  );
  showPosition2();
}
function showPosition2(position) {
  httpGetAsync(
    "https://api.weatherbit.io/v2.0/current?&lat=" +
      lon +
      "&lon=" +
      lat +
      "&key=b8bdad2f87d947d7964c4bbfec088453",
    jsonMaker2
  );
}

getLocation();


// https://cors.io/?
// https://cors-anywhere.herokuapp.com/

// Call Skycon icons from API
function skyCon(wthr) {
  document.querySelector(".icon").setAttribute("id", wthr);
  if (wthr == "clear-day") {
    icons.set(wthr, Skycons.CLEAR_DAY);
  } else if (wthr == "clear-night") {
    icons.set(wthr, Skycons.CLEAR_NIGHT);
  } else if (wthr == "partly-cloudy-day") {
    icons.set(wthr, Skycons.PARTLY_CLOUDY_DAY);
  } else if (wthr == "partly-cloudy-night") {
    icons.set(wthr, Skycons.PARTLY_CLOUDY_NIGHT);
  } else if (wthr == "cloudy") {
    icons.set(wthr, Skycons.CLOUDY);
  } else if (wthr == "rain") {
    icons.set(wthr, Skycons.RAIN);
  } else if (wthr == "sleet") {
    icons.set(wthr, Skycons.SLEET);
  } else if (wthr == "snow") {
    icons.set(wthr, Skycons.SNOW);
  } else if (wthr == "wind") {
    icons.set(wthr, Skycons.WIND);
  } else if (wthr == "fog") {
    icons.set(wthr, Skycons.FOG);
  }
}

// Toggle C to F 
document.querySelector(".slider").onclick = function() {
    var tempClass = document.querySelector('.test');
    tempClass.classList.toggle("temp");
    tempClass.classList.toggle('temp-f');
    tempF = temp * (9/5) + 32;
    tempF = Math.floor(tempF);
    if (tempClass.classList.contains('temp-f')) {      
      tempClass.innerHTML = tempF + "&deg;";
    } else {
      tempClass.innerHTML = temp + "&deg;";
    }    
};

// SKYCONS!!
var icons = new Skycons({ color: "#EB5E28" });

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


