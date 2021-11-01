import './style.css';

function cacheStaticDom() {
  return {
    nameEl: document.querySelector('#name'),
    descEl: document.querySelector('#desc'),
    humidityEl: document.querySelector('#humidity'),
    windspdEl: document.querySelector('#windspd'),
  };
}

function cacheDynamicDom() {
  return {
    tempEl: document.querySelector('#temp'),
    feelsLikeEl: document.querySelector('#feelsLike'),
    highEl: document.querySelector('#high'),
    lowEl: document.querySelector('#low'),
  };
}

function convertToF(num) {
  return Math.round((num - 273) * (9 / 5) + 32);
}
function convertToC(num) {
  return Math.round(num - 273);
}

function makeCard(obj) {
  const staticDom = cacheStaticDom();
  // render static goodness
  function renderStaticValues() {
    staticDom.nameEl.textContent = `${obj.name}`;
    staticDom.descEl.textContent = `${obj.desc}`;
    staticDom.humidityEl.textContent = `humidity: ${obj.humidity}%`;
    staticDom.windspdEl.textContent = `wind speed: ${obj.windspd}m/s`;
  }

  // render f and c
  const dynamicDom = cacheDynamicDom();
  // render f
  function renderF() {
    dynamicDom.tempEl.textContent = `temp: ${convertToF(obj.temp)}`;
    dynamicDom.feelsLikeEl.textContent = `feels like: ${convertToF(obj.feelsLike)}`;
    dynamicDom.highEl.textContent = `max: ${convertToF(obj.max)}`;
    dynamicDom.lowEl.textContent = `min: ${convertToF(obj.min)}`;
  }
  // render c
  function renderC() {
    dynamicDom.tempEl.textContent = `temp: ${convertToC(obj.temp)}`;
    dynamicDom.feelsLikeEl.textContent = `feels like: ${convertToC(obj.feelsLike)}`;
    dynamicDom.highEl.textContent = `max: ${convertToC(obj.max)}`;
    dynamicDom.lowEl.textContent = `min: ${convertToC(obj.min)}`;
  }

  // get checkbox current value on creation
  const toggler = document.querySelector('#checkbox');
  let currentState = toggler.checked;

  // add listener for checkbox updates

  function getCurrentState() {
    currentState = toggler.checked;
    return currentState;
  }

  function addListener() {
    toggler.addEventListener('click', () => {
      getCurrentState();
      if (!currentState) renderF();
      if (currentState) renderC();
    });
  }

  addListener();
  renderStaticValues();
  if (!currentState) renderF();
  if (currentState) renderC();
}

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
    humidity: obj.main.humidity,
  };
}

// this is the function to fetch a city
async function fetchData(city) {
  const makeFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.key}`,
    { mode: 'cors' }
  );
  const weatherData = await makeFetch.json();
  // console.log(weatherData);
  const weatherProps = extractUsefulProps(weatherData);
  return weatherProps;
}

function addInputListener() {
  const inputWrapper = document.querySelector('#inputWrapper');
  const input = inputWrapper.querySelector('#input');
  inputWrapper.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fetchReq = await fetchData(input.value);
    makeCard(fetchReq);
    input.value = '';
  });
}
addInputListener();

async function onPageLoad() {
  const fetchReq = await fetchData('san diego');
  makeCard(fetchReq);
}
onPageLoad();
