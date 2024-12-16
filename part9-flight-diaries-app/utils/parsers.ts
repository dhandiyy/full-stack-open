import { Weather, Visibility } from "../types/type";

//THIS IS TYPE GUARD
//text is string -> Narrowing -> make TypeScript assume that return value is a string
const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const isWeather = (weather: string): weather is Weather => {
    return Object.values(Weather).map(value => value.toString()).includes(weather);
};
const isVisibility = (visibility: string): visibility is Visibility => {
    return Object.values(Visibility).map(value => value.toString()).includes(visibility);
};

//THIS IS PARSER
export const dateParse = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect date: " + date);
    }
    return date;
};

export const commentParse = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error("Incorrect or missing comment");
    }

    return comment;
};

export const weatherParse = (weather: unknown): Weather => {
    if (!isString(weather) || !isWeather(weather)) {
        throw new Error("Incorrect weather: " + weather);
    }
    return weather;
};

export const visibilityParse = (visibility: unknown): Visibility => {
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error("Incorrect visibility: " + visibility);
    }
    return visibility;
};
