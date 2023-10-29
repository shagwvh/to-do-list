const express = require('express');
const { verifyToken } = require('../middlewares');
const { addTaskToList, fetchTasks, deleteTask } = require('../controllers/task');

const router = express.Router();


// get all task for user
router.get('/to-do-list',verifyToken, fetchTasks);

// add tak route
router.post('/add',verifyToken, addTaskToList);

// add tak route
router.delete('/delete/:taskId',verifyToken, deleteTask);

// // Login route
// router.post('/delete',verifyToken, requestToLogin);

// // Sample protected route
// router.get('/update', verifyToken, (req, res) => {
//   res.json({ message: 'This is a protected route', userId: req.userId });
// });

module.exports = router;
