/* Global Variables */
const API_KEY = '21b162d4c785426cad0154946240610';
const API_URL_BASE = 'http://api.weatherapi.com/v1/current.json?key=';



// DOM elements
// Input
const btnGenerateByCity = document.getElementById("btnGenerateByCity");
const inCityName = document.getElementById("inCityName");
const inFeelings = document.getElementById("inFeelings");
// Output
const outInfo = document.getElementById("outputInfo");
const outCountry = document.getElementById("outCountry");
const outCity = document.getElementById("outCity");
const outLocaltime = document.getElementById("outLocaltime");
const outTemp = document.getElementById("outTemp");
const outFeelslike = document.getElementById("outFeelslike");
const outHumidity = document.getElementById("outHumidity");
const outIcon = document.getElementById("outIcon");
const outIconImg = document.getElementById("outIconImg");
const outCondition = document.getElementById("outCondition");
const outFeeling = document.getElementById("outFeeling");

// Function to update page
const updatePage = async() => {
    try {
        const res = await fetch('/weather', {
            method: 'GET'
        });
        if(res.ok) {
            ret = await res.json();
            // console.log("Response: ", ret);

            // Update GUI
            await updateGUI(ret);
        }
    }
    catch(error) {
        // Error handling
        console.error("Failed to update page: ", error);
    }
};

// Function to update GUI
const updateGUI = async(info) => {
    if(!info) {
        console("null input!");
        return;
    }
    // console.log("info: ", info);
    // update GUI
    outInfo.style.border = "2px solid #444";

    // country, city, localtime, tempc, tempf, feelslikec, feelslikef, humidity, icon, condition, feelings
    outCountry.textContent = 'Country: ' + info.country;
    outCity.textContent = 'City: ' + info.city;
    outLocaltime.textContent = `Local time: ${info.localtime}`;
    outTemp.innerHTML = `Temp: <span style="color: blue; font-size: 1.5em">${info.tempc}\u00B0C</span>  (${info.tempf}\u00B0F)`;
    outHumidity.textContent = `Humidity: ${info.humidity}%`;
    outFeelslike.innerHTML = `Feel like: ${info.feelslikec}\u00B0C (${info.feelslikef}\u00B0F)`;

    outIconImg.src = info.icon;
    outCondition.textContent = `Condition: ${info.condition}`;
    outFeeling.textContent = `Your feeling: ${info.feelings}`;
};

/* Using https://weatherapi.com */
// Function to handle generate button by City Name
const getDataByCityListener = async(event) => {
    // setup
    event.preventDefault();

    // Input validation
    const city = inCityName.value.trim();
    const feelings = inFeelings.value.trim();
    if(!city || !feelings) {
        alert("Please enter city name and your feelings then retry!");
        return;
    }

    // get weather data
    try {
        // get data
        const rawData = await getWeatherData(city);

        // post data
        await postWeatherData(rawData);
    } 
    catch(error) {
        // Error handling
        console.error("Failed handling data: ", error);
        // alert("Error! Failed to get data! Please check the input and retry!");
        return null;
    }
};

// Function to handle for GET requet
const getWeatherData = async(city) => {
    // params
    const apiUrl = API_URL_BASE + API_KEY + `&q=${city}&aqi=no`;
    // console.log("apiUrl: ", apiUrl);

    try {
        const response = await fetch(apiUrl, {
            method: 'GET'
        });

        if(!response.ok) {
            errorMsg.textContent = "Failed to fetch data. Please try again.";
            throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const ret = await response.json();
        // console.log("Response: ", ret);
        return ret;
    }
    catch(error) {
        // Error handling
        console.error("Failed to fetch data: ", error);
    }
};

// Function for POST request
const postWeatherData = async(rawData) => {
    if(!rawData) {
        // alert("Warning! Failed to handling POST data. Please try again!");
        console.error("null input!");
    }

    // setup output data
    const postData = {
        country: rawData.location.country
        ,city: rawData.location.name
        ,localtime: rawData.location.localtime
        ,tempc: rawData.current.temp_c
        ,tempf: rawData.current.temp_f
        ,feelslikec: rawData.current.feelslike_c
        ,feelslikef: rawData.current.feelslike_f
        ,humidity: rawData.current.humidity
        ,icon: rawData.current.condition.icon
        ,condition: rawData.current.condition.text
        ,feelings: inFeelings.value.trim()
    };
    // console.log("postData: ", postData);

    try {
        // Set up post data
        await fetch("/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then(updatePage());
    }
    catch(error) {
        // Error handling
        console.error("Failed to fetch data: ", error);
    }
    console.log("postWeatherData: ", done);
};

// Add event listener to get data button
btnGenerateByCity.addEventListener('click', getDataByCityListener);

// For future function to autoloading from DB when starting the app
// Initialize UI when DOM content is loaded
// window.addEventListener("DOMContentLoaded", updatePage);
