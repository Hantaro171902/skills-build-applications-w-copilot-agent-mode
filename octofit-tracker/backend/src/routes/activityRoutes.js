"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activityController_1 = require("../controllers/activityController");
const router = (0, express_1.Router)();
router.get('/', activityController_1.getActivities);
router.get('/user/:userId', activityController_1.getActivitiesByUser);
router.get('/:id', activityController_1.getActivityById);
router.post('/', activityController_1.createActivity);
router.put('/:id', activityController_1.updateActivity);
router.delete('/:id', activityController_1.deleteActivity);
exports.default = router;
//# sourceMappingURL=activityRoutes.js.map