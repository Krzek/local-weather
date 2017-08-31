const api = 'https://fcc-weather-api.glitch.me/api/current?';
let lat, lon;
let currentTempInCelcius;
let currentTempInFahrenheit;
let tempUnit = 'C';

window.addEventListener('load', getCoords);

function getCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
            getWeather(this.lat, this.lon);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function celciusToFahreiheit(temp) {
    return Math.round(parseInt(temp) * 9 / 5 + 32);
}

function getWeather(lat, lon) {
    let urlString = `${api}lat=${lat}&lon=${lon}`;
    console.log(urlString);
    fetch(urlString).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        currentTempInCelcius = Math.round(data.main.temp * 10) / 10;        
        let city = data.name;
        let country = data.sys.country;
        let temp = `${currentTempInCelcius} ${String.fromCharCode(176)}`;
        desc = data.weather[0].main;
        document.getElementById('city').innerHTML = `${city}, `;
        document.getElementById('country').innerHTML = country;
        document.getElementById('temp').innerHTML = temp;
        document.getElementById('tempunit').innerHTML = tempUnit;
        document.getElementById('desc').innerHTML = desc;
        IconGen(desc);
    }).catch(function (error) {
        console.error(error);
    })
}

function changeCelciusToFahreiheit() {
    let currentTempUnit = document.getElementById('tempunit').innerHTML;
    console.log(currentTempUnit);
    let newTempUnit = currentTempUnit == 'C' ? 'F' : 'C';
    if (newTempUnit == 'F') {
        document.getElementById('tempunit').innerHTML = newTempUnit;
        currentTempInFahrenheit = celciusToFahreiheit(currentTempInCelcius);
        document.getElementById('temp').innerHTML = `${currentTempInFahrenheit} ${String.fromCharCode(176)}`;
    } else {
        document.getElementById('tempunit').innerHTML = newTempUnit;
        document.getElementById('temp').innerHTML = `${currentTempInCelcius} ${String.fromCharCode(176)}`;
    }
}

function IconGen(desc) {
    descLowerCase = desc.toLowerCase();
    console.log('DESC TESTE --------->', descLowerCase);
    switch (descLowerCase) {
        case 'drizzle':
            addIcon(descLowerCase);
            break;
        case 'clouds':
            addIcon(descLowerCase);
            break;
        case 'rain':
            addIcon(descLowerCase);
            break;
        case 'snow':
            addIcon(descLowerCase);
            break;
        case 'clear':
            addIcon(descLowerCase);
            break;
        case 'thunderstom':
            addIcon(descLowerCase);
            break;
        default:
            document.getElementById('clouds').classList.remove("hide");
    }

    function addIcon(desc) {
        document.getElementById(desc).classList.remove('hide');
    }
}