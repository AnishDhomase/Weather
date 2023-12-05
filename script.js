const container = document.querySelector('.container');
const searchBtn = document.querySelector('.searchBox button');
const searchinput= document.querySelector('.searchBox input');
const weatherBox = document.querySelector('.weatherBox');
const weatherDetails = document.querySelector('.weatherDetails');

const image = document.querySelector('.weatherBox img');
const temperature = document.querySelector('.weatherBox .temp');
const description = document.querySelector('.weatherBox .description');
const humidity = document.querySelector('.weatherDetails .humidity span');
const wind = document.querySelector('.weatherDetails .wind span');
                      
const ApiKey = 'e143c80458d46609cd18d5cfe88a643a';


searchBtn.addEventListener("click", ()=>{
    const cityName = searchinput.value;
    if(cityName == '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${ApiKey}`).then(response => response.json()).then(json => {
        switch (json.weather[0].main){
            case 'Clear':
                    image.src = 'clear.png';
                    break;
            case 'Rain':
                    image.src = 'rain.png';
                    break;
            case 'Snow':
                    image.src = 'snow.png';
                    break;
            case 'Clouds':
                    image.src = 'cloud.png';
                    break;
            case 'Mist':
                    image.src = 'mist.png';
                    break;
            case 'Haze':
                    image.src = 'mist.png';
                    break;
            default:
                    image.src = 'cloud.png';
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity} %`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/hr`;
    });
})
