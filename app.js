window.addEventListener('load', ()=> {

    let lat;
    let long;
    let tempDesc = document.querySelector(".temp-desc");
    let timeZone = document.querySelector(".tz");
    let temperature = document.querySelector(".temp-degree");
    let tempDegree = document.querySelector(".degree");
    let tempUnit = document.querySelector(".temp-degree p");

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

                    console.log(data);

                    const kelvin = data.main.temp;
                    const celsius = kelvin - 273.15;
                    const icon = data.weather[0].description;
                    tempDegree.textContent = celsius.toFixed(2);
                    tempDesc.textContent = icon;
                    timeZone.textContent = data.name;

                    setIcons('fog', document.querySelector('.icon1')); 

                    temperature.addEventListener('click', function() {
                        if(tempUnit.textContent === "°C") {
                            tempUnit.textContent = "°F";
                            const fah = (celsius * 9/5) + 32;
                            tempDegree.textContent = fah.toFixed(2);
                        } else {
                            tempUnit.textContent = "°C";
                            tempDegree.textContent = celsius.toFixed(2);
                        }

                    });
                });
        });

    } else {
        alert('cannot find your coordiantes');
    };

   function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});

    const  currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
   }
});