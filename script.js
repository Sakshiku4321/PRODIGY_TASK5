const form = document.getElementById('weatherForm'),
      cityInput = document.getElementById('cityInput'),
      card = document.getElementById('weatherCard'),
      errorMsg = document.getElementById('errorMsg'),
      iconEl = document.getElementById('weatherIcon'),
      cityEl = document.getElementById('cityName'),
      descEl = document.getElementById('description'),
      tempEl = document.getElementById('temperature'),
      humidEl = document.getElementById('humidity'),
      windEl = document.getElementById('wind');

const apiKey = '2b679e6b6505743b91a117d1ef0070ac'; // Replace with your API key

form.addEventListener('submit', async e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  errorMsg.hidden = true;
  card.hidden = true;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    if (res.ok) {
      updateUI(data);
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    errorMsg.textContent = `Error: ${err.message}`;
    errorMsg.hidden = false;
  }
});

function updateUI(data) {
  const { name, weather, main, wind } = data;
  cityEl.textContent = `${name}, ${data.sys.country}`;
  descEl.textContent = weather[0].description;
  tempEl.textContent = `Temperature: ${Math.round(main.temp)}°C`;
  humidEl.textContent = `Humidity: ${main.humidity}%`;
  windEl.textContent = `Wind: ${wind.speed} m/s`;
  iconEl.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  iconEl.alt = weather[0].description;

  setBackground(weather[0].main.toLowerCase());
  card.hidden = false;
}

function setBackground(condition) {
  const body = document.body;
  body.className = ''; // Clear existing
  if (condition.includes("clear")) {
    body.classList.add("sunny-bg");
  } else if (condition.includes("cloud")) {
    body.classList.add("cloudy-bg");
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    body.classList.add("rainy-bg");
  } else {
    body.classList.add("default-bg");
  }
}