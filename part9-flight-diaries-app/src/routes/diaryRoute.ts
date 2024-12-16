import express from "express";
import { Response, Request } from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry, NewDiaryEntry } from "../../types/type";
import { errorMiddleware, newDiaryParser } from "../../utils/middleware";

const router = express.Router();

router.get("/", (_req, res: Response<DiaryEntry[]>) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.post(
    "/",
    newDiaryParser,
    (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
        const addedEntry = diaryService.addDiary(req.body);
        res.json(addedEntry);
    }
);

router.get("/:id", (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));

    if (diary) {
        res.send(diary);
    } else {
        res.sendStatus(404);
    }
});

router.use(errorMiddleware);

export default router;
