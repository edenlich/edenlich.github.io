import { AreaData } from "./area-data.model";

export interface AutocompleteLocation {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    Country: AreaData;
    AdministrativeArea: AreaData;
}