const { checkUserExists, insertNewUser } = require("../connections/loginDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { insertNewTask, fetchAllTask, deleteTask } = require("../connections/taskDb");

exports.addTaskToList = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;
  const selectedDate = req.body.selectedDate;
  const status = req.body.status;
  const userId = req.userId;
  if (!title || !description || !priority || !selectedDate || !status) {
    return res.status(400).json({ message: "Please enter all fields data!" });
  }
  console.log(title, description, priority, selectedDate, status, userId, "add task data");
  return insertNewTask(title, description, priority, selectedDate, status, userId)
    .then(async ([result]) => {
        console.log(result);
        return res.status(200).json({ message: "Task Added Successfully" });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.deleteTask = (req, res) =>{
    const { taskId } = req.params;
    return deleteTask(taskId)
    .then(async ([result]) => {
        console.log(result);
        return res.status(200).json({ message: "Task Deleted Successfully" });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

exports.fetchTasks = (req, res) => {
    const userId = req.userId;
    console.log(userId, "fetchTasks");
    return fetchAllTask(userId)
      .then(async ([result]) => {
          console.log(result);
          return res.status(200).json({ message: "success",result });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
  