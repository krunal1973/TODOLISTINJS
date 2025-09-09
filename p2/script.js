document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const citynameDisplay = document.getElementById("city-name");
    const  temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_KEY = "a1300a6164459d6b5a3e39c5782b71d8";//env variable

    getWeatherBtn.addEventListener("click",async()=>{
        const city = cityInput.value;
        if(!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);  

        } catch (error) {

            showError(errorMessage);

        }

    })

    async function fetchWeatherData(city){
   
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);
        if(!response.ok){
            throw new Error("City Not Found");
        }
        const data = await response.json();
        return data;


    }

    function displayWeatherData(weatherData){
        console.log(weatherData);
        const {name,main,weather}= weatherData; 
        citynameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        
    }

    function showError (){
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }



});