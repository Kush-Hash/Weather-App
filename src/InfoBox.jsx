import React from 'react';
import SearchBar from './SearchBar';
import './InfoBox.css';
import weatherBackgrounds from './weatherBackground';
import DateTimeDisplay from './DateTimeDisplay';


const InfoBox = () => {
    // let [weatherInfo, setWeatherInfo] = React.useState({
    //     city: "Kolkata",
    //     temp: 33.75,
    //     feelsLike: 40.7,
    //     minTemp: 33.75,
    //     maxTemp: 33.75,
    //     humidity: 58,
    //     pressure: 999,
    //     windSpeed: 5.5,
    //     weatherDesc: "Little clouds",
    //     weatherMain: "rainy",// ← CHANGE THIS for each test
    //     timezone: 19800
    // });
    let [weatherInfo, setWeatherInfo] = React.useState(null);
    React.useEffect(() => {
        const fetchDefaultCity = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
                const json = await response.json();
                const result = {
                    city: "Kolkata",
                    temp: json.main.temp,
                    feelsLike: json.main.feels_like,
                    minTemp: json.main.temp_min,
                    maxTemp: json.main.temp_max,
                    humidity: json.main.humidity,
                    pressure: json.main.pressure,
                    windSpeed: json.wind.speed,
                    weatherDesc: json.weather[0].description,
                    weatherMain: json.weather[0].main,
                    timezone: json.timezone
                };
                setWeatherInfo(result);
            } catch (err) {
                console.error("Failed to load default city:", err);
            }
        };

        fetchDefaultCity();
    }, []);


    const updateInfo = (result) => {
        setWeatherInfo(result);
    }
    if (!weatherInfo) {
        return (
            <div className="container loadingScreen">
                <p style={{ color: "#fff", fontSize: "1.5rem" }}>Loading Weather Info...</p>
            </div>
        );
    }

    // Get the main condition (e.g., "Rain", "Clouds") from API
    const mainCondition = weatherInfo.weatherMain.toLowerCase();

    // Find the matching key from mapping
    let matchedKey = Object.keys(weatherBackgrounds).find(key =>
        mainCondition.includes(key.toLowerCase())
    );

    // Fallback to default if not matched
    const bgImage = matchedKey ? weatherBackgrounds[matchedKey] : "clear.jpg";
    const containerStyle = {
        backgroundImage: `url(/images/${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        color: '#fff',
    };
    const weatherIcons = {
        Clear: "fas fa-sun",
        Clouds: "fas fa-cloud",
        Rain: "fas fa-cloud-showers-heavy",
        Drizzle: "fas fa-cloud-rain",
        Thunderstorm: "fas fa-bolt",
        Snow: "fas fa-snowflake",
        Mist: "fas fa-smog",
        Smoke: "fas fa-smog",
        Haze: "fas fa-smog",
        Dust: "fas fa-smog",
        Fog: "fas fa-smog",
        Sand: "fas fa-smog",
        Ash: "fas fa-smog",
        Squall: "fas fa-wind",
        Tornado: "fas fa-tornado"
    };
    const iconClass = weatherIcons[weatherInfo.weatherMain] || "fas fa-cloud"; // default fallback

    return (
        <div className="container" style={containerStyle}>
            <div className="overlay"></div> {/*overlay */}
            <div className="leftBox">
                <div className="temperature">
                    <p id="temp">{Math.ceil(weatherInfo.temp)}°</p>
                    <div>
                        <p id="weather-city">{weatherInfo.city}</p>
                        <p className='datetime'><DateTimeDisplay timezone={weatherInfo.timezone} /></p>
                    </div>
                    <p><i className={iconClass} style={{ fontSize: "3.2rem", marginRight: "10px" }}></i></p>
                </div>
            </div>

            <div className="rightBox glass-panel">
                <SearchBar updateInfo={updateInfo} />
                <div className="detailsSection">
                    <h3>Weather Details...</h3>
                    <p>Today's weather forecast : </p>
                    <p className='weatherDesc'>{weatherInfo.weatherDesc}</p>
                    <table className="weatherTable">
                        <tbody>
                            <tr>
                                <th>Feels Like</th>
                                <td className="value-cell">{Math.ceil(weatherInfo.feelsLike)}°</td>
                                <td className="icon-cell"><i className="fa-regular fa-face-smile-beam"></i></td>
                            </tr>
                            <tr>
                                <th>Min Temp</th>
                                <td className="value-cell">{Math.ceil(weatherInfo.minTemp)}°</td>
                                <td className="icon-cell"><i className="fa-solid fa-temperature-low"></i></td>
                            </tr>
                            <tr>
                                <th>Max Temp</th>
                                <td className="value-cell">{Math.ceil(weatherInfo.maxTemp)}°</td>
                                <td className="icon-cell"><i className="fa-solid fa-temperature-full"></i></td>
                            </tr>
                            <tr>
                                <th>Humidity</th>
                                <td className="value-cell">{weatherInfo.humidity}%</td>
                                <td className="icon-cell"><i className="fa-solid fa-droplet"></i></td>
                            </tr>
                            <tr>
                                <th>Wind Speed</th>
                                <td className="value-cell">{weatherInfo.windSpeed}&nbsp;km/hr</td>
                                <td className="icon-cell"><i className="fa-solid fa-wind"></i></td>
                            </tr>
                            <tr>
                                <th>Pressure</th>
                                <td className="value-cell">{weatherInfo.pressure}&nbsp;hPa</td>
                                <td className="icon-cell"><i className="fa-solid fa-gauge-high"></i></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='bottomicon-conainer'>
                        <i className={`${iconClass} bottomIcon`}> </i>
                        <p className='bottom-para'>{weatherInfo.weatherDesc}</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default InfoBox;
