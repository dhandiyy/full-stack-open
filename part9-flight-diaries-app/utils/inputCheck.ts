import { NewDiaryEntry } from "../types/type";
import { commentParse, dateParse, visibilityParse, weatherParse } from "./parsers";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }

    if ("comment" in object && "date" in object && "weather" in object && "visibility" in object) {
        const newEntry: NewDiaryEntry = {
            date: dateParse(object.date),
            weather: weatherParse(object.weather),
            visibility: visibilityParse(object.visibility),
            comment: commentParse(object.comment),
        };

        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewDiaryEntry;
