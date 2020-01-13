const express = require('express');
const controller = require('../controllers/controllers');
const router = express.Router();

router.get('/', controller.getAll);
router.post('/login', controller.getUsers);
router.post('/registration', controller.createUser);
router.post('/create', controller.createDo);
router.post('/update/:id', controller.updateDo);
router.post('/delete/:id', controller.deleteDo);
router.post('/deleteall', controller.deleteAll);

module.exports = router;
