import express from 'express';
import authController from '../controllers/auth.js';
import jwtAuth from '../services/passport.js';

const router = express.Router();

router.post('/login', authController.login);

router.get('/', authController.getAll);


router.get('/current', jwtAuth.authenticate(), authController.getUser);

router.get('/:id',  authController.getUserById);

router.post('/create', authController.create);

router.post('/change-password', authController.changePassword);


router.put(
  '/answered-subject',
  jwtAuth.authenticate(),
  authController.AnsweredSuject
  );

router.put('/:userId', authController.update);

export default router;
