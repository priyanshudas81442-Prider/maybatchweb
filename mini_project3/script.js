const API_KEY = "4fe4fa48d07a09a88fbabad496945ecc";

async function getWeather() {
  let city = document.getElementById("city").value.trim();

  if (city === "") {
    alert("Enter city");
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }

    let data = await response.json();

    document.getElementById("temp").innerHTML =
      Math.round(data.main.temp) + "°C";

    document.getElementById("cityName").innerHTML = data.name;

    document.getElementById("humidity").innerHTML = data.main.humidity + "%";

    document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

    let weather = data.weather[0].main;

    let icon = "☀";

    if (weather === "Clouds") icon = "☁";
    else if (weather === "Rain") icon = "🌧";
    else if (weather === "Snow") icon = "❄";
    else if (weather === "Thunderstorm") icon = "⛈";

    document.querySelector(".icon").innerHTML = icon;
  } catch {
    alert("City not found or API error");
  }
}

document.getElementById("city").addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});
