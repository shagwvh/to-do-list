const express = require('express');
const { verifyToken } = require('../middlewares');
const { addTaskToList, fetchTasks, deleteTask, updateTask } = require('../controllers/task');

const router = express.Router();


// get all task for user
router.get('/to-do-list',verifyToken, fetchTasks);

// add tak route
router.post('/add',verifyToken, addTaskToList);

// delete task route
router.delete('/delete/:taskId',verifyToken, deleteTask);


// update task route
router.post('/update',verifyToken, updateTask);

// // Login route
// router.post('/delete',verifyToken, requestToLogin);

// // Sample protected route
// router.get('/update', verifyToken, (req, res) => {
//   res.json({ message: 'This is a protected route', userId: req.userId });
// });

module.exports = router;
