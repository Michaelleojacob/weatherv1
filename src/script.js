import './style.css';

function extractUsefulProps(obj) {
  return {
    name: obj.name,
    feelsLike: obj.main.feels_like,
    temp: obj.main.temp,
    max: obj.main.temp_max,
    min: obj.main.temp_min,
    desc: obj.weather[0].description,
    icon: obj.weather[0].icon,
    windspd: obj.wind.speed,
  };
}

// this is the function to fetch a city
async function fetchData(city) {
  const makeFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.key}`,
    { mode: 'cors' }
  );
  const weatherData = await makeFetch.json();
  const weatherProps = extractUsefulProps(weatherData);
  console.log(weatherProps);
  return weatherProps;
}
fetchData('san diego');

const checkbox = document.querySelector('#checkbox');
console.log(checkbox.checked);
