const apiKey = "68686ffff4d06133be2e692824b45274";
const form = document.querySelector("form");
const input = document.querySelector("#weather-search");
const weather = document.querySelector("#weather");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  weather.innerHTML = "";
  const search = input.value.trim();
  input.value = "";
  if (!search) return;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=imperial&appid=" + apiKey;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.cod != 200) {
        weather.innerHTML = "<h2>Location not found</h2>";
        return;
      }
      
      const city = data.name;
      const country = data.sys.country;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const temp = data.main.temp;
      const feelsLike = data.main.feels_like;
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const updated = new Date(data.dt * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
      });
      const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon;

      weather.innerHTML = `
        <h2>${city}, ${country}</h2>
        <a href="${mapUrl}" target="__BLANK">Click to view map</a>
        <img src="${iconUrl}">
        <p style="text-transform: capitalize;">${description}</p><br>
        <p>Current: ${temp}° F</p>
        <p>Feels like: ${feelsLike}° F</p><br>
        <p>Last updated: ${updated}</p>
      `;
    })

    .catch(function() {
      weather.innerHTML = "<h2>Location not found</h2>";
    });
});
