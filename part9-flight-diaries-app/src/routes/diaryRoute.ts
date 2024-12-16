import express from "express";
import { Response } from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry } from "../../types/type";
import toNewDiaryEntry from "../../utils/inputCheck";

const router = express.Router();

router.get("/", (_req, res: Response<DiaryEntry[]>) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
        
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error){
            errorMessage += 'Error: ' + error.message;
        }
        res.status(404).send(errorMessage);
    }
});

router.get("/:id", (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));

    if (diary) {
        res.send(diary);
    } else {
        res.sendStatus(404);
    }
});

export default router;
