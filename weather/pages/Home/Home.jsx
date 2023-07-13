import { Text, View } from "react-native";
import { s } from "./Home.styles";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { WeatherAPI } from "../../api/weather";
import { MeteoBasic } from "../../components/MeteoBasic/MeteoBasic";
import { getWeatherInterpretation } from "../../services/meteo-service";
import { MeteoAdvanced } from "../../components/MeteoAdvanced/MeteoAdvanced";

export function Home({}) {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const currentWeather = weather?.current_weather;

  async function getUserCoods() {
    let { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      setCoords({ lat: "48.85", lng: "2.35" });
    }
  }

  async function fetchWeather(coordinates) {
    const weatherResponse = await WeatherAPI.fetchWeatherFromCoords(
      coordinates
    );
    setWeather(weatherResponse);
  }

  async function fetchCity(coordinates) {
    const cityResponse = await WeatherAPI.fetchCityFromCoords(coordinates)
    setCity(cityResponse)
  }

  useEffect(() => {
    getUserCoods();
  }, []);

  useEffect(() => {
    if (coords) {
      fetchWeather(coords);
      fetchCity(coords)
    }
  }, [coords]);

  return currentWeather ? (
    <>
      <View style={s.meteo_basic}>
        <MeteoBasic
          temperature={Math.round(currentWeather.temperature)}
          city={city}
          interpretation={getWeatherInterpretation(currentWeather.weathercode)}
        />
      </View>
      <View style={s.searchbar_container}></View>
      <View style={s.meteo_advanced}>
        <MeteoAdvanced wind={currentWeather.windspeed} dusk={weather.daily.sunrise[0].split("T")[1]} dawn={weather.daily.sunset[0].split("T")[1]}/>
      </View>
    </>
  ) : null;
}
