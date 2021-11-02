import './style.css';

function getDomParent() {
  return document.querySelector('#cardWrap');
}

function cacheStaticDom() {
  const parent = getDomParent();
  return {
    nameEl: parent.querySelector('#name'),
    descEl: parent.querySelector('#desc'),
    humidityEl: parent.querySelector('#humidity'),
    windspdEl: parent.querySelector('#windspd'),
  };
}

function cacheDynamicDom() {
  const parent = getDomParent();
  return {
    tempEl: parent.querySelector('#temp'),
    feelsLikeEl: parent.querySelector('#feelsLike'),
    highEl: parent.querySelector('#high'),
    lowEl: parent.querySelector('#low'),
  };
}

function convertToF(num) {
  return Math.round((num - 273) * (9 / 5) + 32);
}
function convertToC(num) {
  return Math.round(num - 273);
}

function makeCard(obj) {
  const toggler = document.querySelector('#checkbox');
  let currentState = toggler.checked;

  const staticDom = cacheStaticDom();

  function renderStaticValues() {
    staticDom.nameEl.textContent = `${obj.name}`;
    staticDom.descEl.textContent = `${obj.desc}`;
    staticDom.humidityEl.textContent = `humidity: ${obj.humidity} %`;
    staticDom.windspdEl.textContent = `wind speed: ${obj.windspd} m/s`;
  }

  const dynamicDom = cacheDynamicDom();

  function renderDynamicDom(fn, temp) {
    dynamicDom.tempEl.innerHTML = `temp: ${fn(obj.temp)}&deg;${temp}`;
    dynamicDom.feelsLikeEl.innerHTML = `feels like: ${fn(obj.feelsLike)}&deg;${temp}`;
    dynamicDom.highEl.innerHTML = `max: ${fn(obj.max)}&deg;${temp}`;
    dynamicDom.lowEl.innerHTML = `min: ${fn(obj.min)}&deg;${temp}`;
  }

  function getCurrentState() {
    currentState = toggler.checked;
    return currentState;
  }

  function renderBasedOnState() {
    getCurrentState();
    return currentState ? renderDynamicDom(convertToC, 'C') : renderDynamicDom(convertToF, 'F');
  }

  function addListener() {
    toggler.addEventListener('click', () => {
      renderBasedOnState();
    });
  }

  addListener();
  renderStaticValues();
  renderBasedOnState();
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
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.key}`,
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
