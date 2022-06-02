const formEl = document.querySelector("form");
const locationInputEl = document.getElementById("location");
const weatherEl = document.getElementById("weather");
const loader = document.querySelector(".loader");
async function getWeatherData(location) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fed2b519e7dbeb7ccb178d51d13e9029`,
      { mode: "cors" }
    );

    let data = await response.json();
    if (data.cod === 200) {
      loader.style.display = "none";
      weatherEl.textContent = data.weather[0].main;
      console.log(data);
    } else if (data.cod === "404") {
      weatherEl.textContent = data.message;
      loader.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

formEl.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();
  loader.style.display = "block";

  const location = locationInputEl.value;
  getWeatherData(location);
}
