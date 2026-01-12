import express from 'express';
import ctrl from '../controllers/propertyComparison.controller.js';
const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;

