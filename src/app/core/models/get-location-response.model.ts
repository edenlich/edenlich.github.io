import { AreaData } from "./area-data.model";
import { Temperature } from "./temperature.model";

export interface TimeZone {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: string;
}

export interface GeoPosition {
    Latitude: number;
    Longitude: number;
    Elevation: {
        Metric: Temperature;
        Imperial: Temperature;
    };
}

export interface GetLocationResponse {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    EnglishName: string;
    PrimaryPostalCode: string;
    Region: AreaData;
    Country: AreaData;
    AdministrativeArea: AreaData;
    TimeZone: TimeZone;
    GeoPosition: GeoPosition;
    IsAlias: boolean;
    SupplementalAdminAreas: string[];
    DataSets: string[];
}