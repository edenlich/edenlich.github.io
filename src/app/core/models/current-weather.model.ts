import { Temperature } from "./temperature.model";

export interface CurrentWeatherResponse {
    LocalObservationDateTime: string;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType: string | null;
    IsDayTime: boolean;
    Temperature: {
        Metric: Temperature;
        Imperial: Temperature;
    };
    MobileLink: string;
    Link: string;
}

export interface CurrentWeather extends Omit<CurrentWeatherResponse, 'Temperature'> {
    Temperature: Temperature;
}