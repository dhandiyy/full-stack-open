//this type alias or union
// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
// export type Visibility = "great" | "good" | "ok" | "poor";

//this another way to make Weather and Visibility
export enum Weather {
    Sunny = "sunny",
    Rainy = "rainy",
    Cloudy = "cloudy",
    Stormy = "stormy",
    Windy = "windy",
}

export enum Visibility {
    Great = "great",
    Good = "good",
    Ok = "ok",
    Poor = "poor",
}

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string; //question martk to make the field optional
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
export type NewDiaryEntry = Omit<DiaryEntry, "id">;
