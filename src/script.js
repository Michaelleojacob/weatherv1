import './style.css';

async function fetchData(city) {
  const makeFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.key}`,
    { mode: 'cors' }
  );
  const weatherData = await makeFetch.json();
  console.log(weatherData);
}
fetchData('san diego');

const checkbox = document.querySelector('#checkbox');
console.log(checkbox.checked);

// we can call fetchData(city)
// we can check the checkbox value

// on submit
// make fetch
// depending on checkbox ->
// -> render card -> f or c

// Q how to have the card check for checkbox click
// Q checkbox changes how to re render the card
