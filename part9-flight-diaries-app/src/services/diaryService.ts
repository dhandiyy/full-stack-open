import diaryData from "../data/entries.json";
import { DiaryEntry, Visibility, Weather } from "../../types/type";

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const addDiary = () => {
    return null;
};

export default {
    getEntries,
    addDiary,
};
