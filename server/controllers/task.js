const { checkUserExists, insertNewUser } = require("../connections/loginDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
//   return checkUserExists(userName)
//     .then(async ([result]) => {
//       if (result.length) {
//         // fetching user data
//         return res.status(201).json({ message: "User name already exists" });
//       } else {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await insertNewUser(userName, email, hashedPassword, name);
//         return res.status(200).json({ message: "User created successfully" });
//       }
//     })
//     .catch((err) => {
//       return Promise.reject(err);
//     });
};
