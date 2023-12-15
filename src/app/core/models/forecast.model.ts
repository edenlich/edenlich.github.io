import { Temperature } from "./temperature.model";

export interface Headline {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
}

export interface Phase {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
}

export interface DailyForecast {
    Date: string;
    EpochDate: number;
    Temperature: {
        Minimum: Temperature;
        Maximum: Temperature;
    };
    Day: Phase;
    Night: Phase;
    Sources: string[];
    MobileLink: string;
    Link: string;
}

export interface Forecast {
    Headline: Headline;
    DailyForecasts: DailyForecast[];
}