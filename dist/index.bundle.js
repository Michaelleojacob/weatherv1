/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
async function fetchData(city) {
  const makeFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"6f7162b3707366bc6e23b2888f875c1b"}`,
    { mode: 'cors' }
  );
  const weatherData = await makeFetch.json();
  console.log(weatherData);
}
fetchData('san diego');

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBLHdEQUF3RCxLQUFLLFNBQVMsa0NBQWUsQ0FBQztBQUN0RixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJ2MS8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKGNpdHkpIHtcbiAgY29uc3QgbWFrZUZldGNoID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JmFwcGlkPSR7cHJvY2Vzcy5lbnYua2V5fWAsXG4gICAgeyBtb2RlOiAnY29ycycgfVxuICApO1xuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IG1ha2VGZXRjaC5qc29uKCk7XG4gIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcbn1cbmZldGNoRGF0YSgnc2FuIGRpZWdvJyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=