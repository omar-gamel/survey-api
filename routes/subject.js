import express from 'express';
import subjectController from '../controllers/subject';
import jwtAuth from '../services/passport';

const router = express.Router();

router.post('/create', subjectController.create);

router.get('/all', subjectController.getAll);

router.get('/:subjectId', subjectController.getSubject);

router.put('/:subjectId', subjectController.update);

router.delete('/:subjectId', subjectController.delete);

router.get('/', jwtAuth.authenticate(), subjectController.getUserSubject);

export default router;
