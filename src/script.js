import './style.css';

const toggler = document.querySelector('#checkbox');

// cache dom
function getDomParent() {
  return document.querySelector('#cardWrap');
}

// cache dom
function cacheStaticDom() {
  const parent = getDomParent();
  return {
    nameEl: parent.querySelector('#name'),
    descEl: parent.querySelector('#desc'),
    humidityEl: parent.querySelector('#humidity'),
    windspdEl: parent.querySelector('#windspd'),
  };
}

// cache dom
function cacheDynamicDom() {
  const parent = getDomParent();
  return {
    tempEl: parent.querySelector('#temp'),
    feelsLikeEl: parent.querySelector('#feelsLike'),
    highEl: parent.querySelector('#high'),
    lowEl: parent.querySelector('#low'),
  };
}

// basic convert functions
function convertToF(num) {
  return Math.round((num - 273) * (9 / 5) + 32);
}
function convertToC(num) {
  return Math.round(num - 273);
}

// gets the toggler checked value F / T
function getCurrentState() {
  return toggler.checked;
}

// caches and renders C or F to the cf spans
function renderCorF() {
  const state = getCurrentState();
  const parent = getDomParent();
  const allcf = Array.from(parent.querySelectorAll('.cf'));
  return state
    ? allcf.map((spanEl) => (spanEl.textContent = 'C'))
    : allcf.map((spanEl) => (spanEl.textContent = 'F'));
}

// big daddy function, lets see if we can maybe break it up.
function makeCard(obj) {
  // cache static dom and then render static values
  const staticDom = cacheStaticDom();
  (function renderStaticValues() {
    staticDom.nameEl.textContent = `${obj.name}`;
    staticDom.descEl.textContent = `${obj.desc}`;
    staticDom.humidityEl.textContent = `humidity: ${obj.humidity} %`;
    staticDom.windspdEl.textContent = `wind: ${obj.windspd} m/s`;
  })();

  // cache dynamic dom then render dynamic dom
  const dynamicDom = cacheDynamicDom();
  function renderDynamicDom(fn) {
    dynamicDom.tempEl.textContent = `${fn(obj.temp)}`;
    dynamicDom.feelsLikeEl.textContent = `feels like: ${fn(obj.feelsLike)}`;
    dynamicDom.highEl.textContent = `high: ${fn(obj.max)}`;
    dynamicDom.lowEl.textContent = `low: ${fn(obj.min)}`;
  }

  // calls the correct render (static / dynamic) base on getCurrState()
  function renderBasedOnState() {
    const currentState = getCurrentState();
    renderCorF();
    return currentState ? renderDynamicDom(convertToC) : renderDynamicDom(convertToF);
  }

  (function addListener() {
    toggler.addEventListener('click', () => {
      renderBasedOnState();
    });
  })();

  // run this function on makeCard();
  renderBasedOnState();
}

// returns an object with all the properties I use
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
  console.log(weatherData);
  const weatherProps = extractUsefulProps(weatherData);
  return weatherProps;
}

// listen for input submit
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

// load some data on start. - might make more static
// no fetch - just an object with the appropriate keys.
async function onPageLoad() {
  const fetchReq = await fetchData('san diego');
  makeCard(fetchReq);
}
onPageLoad();
