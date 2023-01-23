window.addEventListener('load', ()=> {

    let lat;
    let long;
    let tempDesc = document.querySelector(".temp-desc");
    let timeZone = document.querySelector(".tz");
    let temperature = document.querySelector(".temp-degree");
    let tempDegree = document.querySelector(".degree");
    let tempUnit = document.querySelector(".unit");
    let tempMemo = document.querySelector(".memo");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            // const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=weathercode`;
            const key = '13584083f1aa84005931e77de9107749';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
           
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    // console.log(data);

                    const kelvin = data.main.temp;
                    const celsius = kelvin - 273.15;
                    const icon = data.weather[0].description;
                    tempDegree.textContent = Math.floor(celsius) + '°';
                    tempDesc.textContent = icon;
                    timeZone.textContent = data.name;

                    setIcons(icon, document.querySelector('.icon1')); 

                    temperature.addEventListener('click', function() {
                        if(tempUnit.textContent === "C") {
                            tempUnit.textContent = "F";
                            const fah = (celsius * 9/5) + 32;
                            tempDegree.textContent = Math.floor(fah) + '°';
                            tempMemo.textContent = "Click to celsius";
                        } else {
                            tempUnit.textContent = "C";
                            tempDegree.textContent = Math.floor(celsius) + '°';
                            tempMemo.textContent = "Click to fahrenheit";
                        }

                    });
                });
        });

    } else {
        alert('cannot find your coordiantes');
    };

   function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});

    switch (icon) {
        case "clear sky":
           icon = "clear_day"; 
            break;
        case "few clouds":
           icon = "partly_cloudy_day"; 
            break;
        case "scattered clouds":
        case "broken clouds":
           icon = "cloudy"; 
            break;
        case "shower rain":
           icon = "rain"; 
            break;
        case "rain":
        case "thunderstorm":
           icon = "sleet"; 
            break;
        case "mist":
        case "haze":
           icon = "fog"; 
            break;
    
       
    }

    setColor(icon);

    const  currentIcon = icon.toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
   }

   function setColor(mood) {

    if (mood === "clear_day") {
        document.body.classList.add("clear-day");

    } else if (mood === "partly_cloudy_day") {
        document.body.classList.add("partly-cloudy");

    } else if (mood === "cloudy") {
        document.body.classList.add('cloudy');

    } else if (mood === "rain") {
        document.body.classList.add('rain');
        
    } else if (mood === "sleet") {
        document.body.classList.add('sleet');

    } else if (mood === "snow") {
        document.body.classList.add('snow');

    } 
    

   }


});