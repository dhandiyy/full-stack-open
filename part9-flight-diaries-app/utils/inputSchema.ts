import { z } from "zod";
import { NewDiaryEntry, Visibility, Weather } from "../types/type";
// import { commentParse, dateParse, visibilityParse, weatherParse } from "./parsers";


//SCHEMA
export const NewEntrySchema = z.object({
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    date: z.string().date(),
    comment: z.string().optional()
});


// const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//     if (!object || typeof object !== "object") {
//         throw new Error("Incorrect or missing data");
//     }

//     if ("comment" in object && "date" in object && "weather" in object && "visibility" in object) {
//         const newEntry: NewDiaryEntry = {
//             date: dateParse(object.date),
//             weather: weatherParse(object.weather),
//             visibility: visibilityParse(object.visibility),
//             comment: commentParse(object.comment),
//         };

//         return newEntry;
//     }
//     throw new Error('Incorrect data: some fields are missing');
// };

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    return NewEntrySchema.parse(object);
};

export default toNewDiaryEntry;
