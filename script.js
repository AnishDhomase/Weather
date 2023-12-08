const container = document.querySelector('.container');
const searchBtn = document.querySelector('.searchBox button');
const searchinput= document.querySelector('.searchBox input');
const weatherBox = document.querySelector('.weatherBox');
const weatherDetails = document.querySelector('.weatherDetails');
const errorNotFound = document.querySelector(".notFound");
const errorNotFoundP = document.querySelector(".notFound p");
const errorNotFoundImg = document.querySelector(".notFound img");

const image = document.querySelector('.weatherBox img');
const temperature = document.querySelector('.weatherBox .temp');
const description = document.querySelector('.weatherBox .description');
const humidity = document.querySelector('.weatherDetails .humidity span');
const wind = document.querySelector('.weatherDetails .wind span');
                      

searchBtn.addEventListener("click", ()=>{
    const cityName = searchinput.value;
    if(cityName == ''){
        searchBtn.classList.remove("fa-magnifying-glass");
        searchBtn.classList.add("fa-ban");

        errorNotFoundImg.classList.add("Grow");
        errorNotFoundP.classList.add("Rotate");

        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        errorNotFound.classList.add("active");
        errorNotFoundP.innerHTML = "Please Enter Location First!";

        setTimeout(function(){
                searchBtn.classList.remove("fa-ban");
                searchBtn.classList.add("fa-magnifying-glass");
        },1001);
        setTimeout(function(){
                errorNotFoundImg.classList.remove("Grow");
                errorNotFoundP.classList.remove("Rotate");
        },3001);
        return;
    }

    const ApiKey = 'e143c80458d46609cd18d5cfe88a643a';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${ApiKey}`).then(response => response.json()).then(json => {
        if(json.cod == '404'){
                searchBtn.classList.remove("fa-magnifying-glass");
                searchBtn.classList.add("fa-ban");

                errorNotFoundImg.classList.add("Grow");
                errorNotFoundP.classList.add("Rotate");

                container.style.height = "400px";
                weatherBox.classList.remove("active");
                weatherDetails.classList.remove("active");
                errorNotFound.classList.add("active");
                errorNotFoundP.innerHTML = "Ooops! Location not found";
                setTimeout(function(){
                        searchBtn.classList.remove("fa-ban");
                        searchBtn.classList.add("fa-magnifying-glass");
                },1001);
                setTimeout(function(){
                        errorNotFoundImg.classList.remove("Grow");
                        errorNotFoundP.classList.remove("Rotate");
                },3001);
                return;
        }
        
        searchBtn.classList.remove("fa-magnifying-glass");
        searchBtn.classList.add("fa-check");

        container.style.height = "555px";
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        errorNotFound.classList.remove("active");

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
                    image.src = '404.png';
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity} %`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/hr`;

        image.classList.add("Fade");
        temperature.classList.add("Rotate");
        description.classList.add("Fade");
        humidity.classList.add("Rotate");
        wind.classList.add("Rotate");
        setTimeout(function(){
                searchBtn.classList.remove("fa-check");
                searchBtn.classList.add("fa-magnifying-glass");
        },1001);
        setTimeout(function(){
                image.classList.remove("Fade");
                temperature.classList.remove("Rotate");
                description.classList.remove("Fade");
                humidity.classList.remove("Rotate");
                wind.classList.remove("Rotate");
        },3001);
        

    });
})
