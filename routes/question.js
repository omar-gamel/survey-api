import express from 'express';
import questionController from '../controllers/question';

const router = express.Router();

router.post('/create', questionController.create);

router.get('/all', questionController.getAll);

router.get('/:questionId', questionController.getById);

router.get('/survey/:questionType', questionController.getByType);

router.put('/:questionId', questionController.update);

router.delete('/:questionId', questionController.delete);

export default router;
