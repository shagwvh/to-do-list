const { checkUserExists, insertNewUser } = require("../connections/loginDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  insertNewTask,
  fetchAllTask,
  deleteTask,
  updateTask,
} = require("../connections/taskDb");

// Controller function to add a task to the list
exports.addTaskToList = async (req, res) => {
  try {
    // Extracting relevant data from the request body
    const { title, description, priority, selectedDate, status } = req.body;
    const userId = req.userId;

    // Checking if all required fields are provided
    if (!title || !description || !priority || !selectedDate || !status) {
      return res.status(400).json({ message: "Please enter all fields data!" });
    }

    // Logging the task data for debugging purposes
    console.log(
      `${title}, ${description}, ${priority}, ${selectedDate}, ${status}, ${userId}, add task data`
    );

    // Adding the task to the database
    const [result] = await insertNewTask(
      title,
      description,
      priority,
      selectedDate,
      status,
      userId
    );

    // Logging the result of the database operation
    console.log(result);

    // Sending a success response to the client
    return res.status(200).json({ message: "Task Added Successfully" });
  } catch (err) {
    // Handling errors and sending an error response
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to delete a task from the list
exports.deleteTask = async (req, res) => {
  try {
    // Extracting the taskId from the request parameters
    const { taskId } = req.params;

    // Deleting the task from the database
    const [result] = await deleteTask(taskId);

    // Logging the result of the database operation
    console.log(result);

    // Sending a success response to the client
    return res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    // Extracting taskId and status from the request body
    const { taskId, status } = req.body;

    // Updating the task status in the database
    const [result] = await updateTask(taskId, status);

    // Logging the result of the database operation
    console.log(result);

    // Sending a success response to the client
    return res.status(200).json({ message: "Task Updated Successfully" });
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.fetchTasks = async (req, res) => {
  try {
    // Extracting userId and sortBy from the request
    const userId = req.userId;
    const sortBy = req.query.sortBy;

    // Logging for debugging purposes
    console.log(userId, sortBy, "fetchTasks");

    // Fetching all tasks for the user from the database
    const [result] = await fetchAllTask(userId, sortBy);

    // Logging the result of the database operation
    console.log(result);

    // Sending a success response with the fetched tasks to the client
    return res.status(200).json({ message: "success", result });
  } catch (error) {
    // Handling errors and sending an appropriate error response
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
