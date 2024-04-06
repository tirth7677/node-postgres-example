const { Router } = require('express');
const { getstudents, getstudentsbyid, createnewstudents, deleteStudent, updateStudent } = require('./controller');

const router = Router();

router.get('/', getstudents);
router.get('/:id', getstudentsbyid); // This route expects an id parameter
router.post('/', createnewstudents);
router.delete('/:id', deleteStudent); // This route expects an id parameter
router.put('/:id', updateStudent); // This route expects an id parameter

module.exports = router;