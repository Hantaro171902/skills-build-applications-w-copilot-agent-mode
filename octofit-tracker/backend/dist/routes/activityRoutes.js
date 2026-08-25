import { Router } from 'express';
import { getActivities, getActivitiesByUser, getActivityById, createActivity, updateActivity, deleteActivity, } from '../controllers/activityController.js';
const router = Router();
router.get('/', getActivities);
router.get('/user/:userId', getActivitiesByUser);
router.get('/:id', getActivityById);
router.post('/', createActivity);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);
export default router;
//# sourceMappingURL=activityRoutes.js.map