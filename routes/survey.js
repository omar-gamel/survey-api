import express from 'express';
import surveyController from '../controllers/survey';

const router = express.Router();

router.post('/create/:subjectId', surveyController.create);

router.get('/:subjectId/:questionId', surveyController.getCount);

router.get('/:subjectId', surveyController.getBySubjectId);

export default router;
