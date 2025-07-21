import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import './Searchbar.css';

const SearchBar = ({ updateInfo }) => {
    let [city, setCity] = React.useState("");
    let [error, setError] = React.useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const getWeatherInfo = async () => {
        let response = await fetch(`${API_URL}?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        if (response.ok) {
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                feelsLike: jsonResponse.main.feels_like,
                minTemp: jsonResponse.main.temp_min,
                maxTemp: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                pressure: jsonResponse.main.pressure,
                windSpeed: jsonResponse.wind.speed,
                weatherDesc: jsonResponse.weather[0].description,
                weatherMain: jsonResponse.weather[0].main,
                timezone: jsonResponse.timezone
            };
            return result;
        } else {
            throw new Error(jsonResponse.message);
        }
    };

    const changeTextFeild = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false); // Reset error state on new submit
        try {
            let info = await getWeatherInfo();
            updateInfo(info);
            setCity("");
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className='searchBox'>
            <form className='searchForm' onSubmit={handleSubmit}>
                <TextField
                    id="city-input"
                    label="Enter City Name"
                    variant="standard"
                    value={city}
                    onChange={changeTextFeild}
                    required
                />
                <IconButton type="submit" aria-label="search" className="search-icon">
                    <SearchIcon />
                </IconButton>
            </form>
            {error && <p style={{ color: 'red' }}>No such place exists.</p>}
        </div>
    );
};

export default SearchBar;
