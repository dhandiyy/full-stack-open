import diaryData from "../data/entries";
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../../types/type";

const getEntries = (): DiaryEntry[] => {
    return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaryData.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaryData.map((d) => d.id)) + 1,
       ...entry
    };

    diaryData.push(newDiaryEntry);
    return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaryData.find((d) => d.id === id);
    return entry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
};
