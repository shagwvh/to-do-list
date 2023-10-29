import React, { useEffect, useState } from "react";
import "./ToDoList.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { DatePicker } from "antd";
import {addTask as addTaskService, fetchAllTasks} from '../../services/task'
const TaskForm = ({ addTask }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Low");
  const [selectedDate, setSelectedDate] = useState('');

  // Handler for date change
  const handleDateChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    setSelectedDate(dateString)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, status, priority, selectedDate });
    setTitle("");
    setDescription("");
    setStatus("To Do");
    setPriority('Low');
    setSelectedDate('');
    toggle()
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Add New Task
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader close={closeBtn}>
          Add Task
        </ModalHeader>
        <ModalBody>
          <form>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <label>
              Due Date:
              <DatePicker
                // value={selectedDate} // Set the value to the selectedDate state
                onChange={handleDateChange} // Set the onChange handler to handleDateChange function
              />{" "}
            </label>
            <label>
              Priority of Task:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium"> Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label>
              Status:
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e)=>handleSubmit(e)}>
            Add Task
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    console.log(tasks)
  return (
    <table className="todolist-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Due Date</th>
          <th>Update Status</th>
          <th>Delete Task</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>
              <strong>{task.title}</strong>
            </td>
            <td>{task.description}</td>
            <td> {task.status}</td>
            <td> {task.priority}</td>
            <td> {task.selectedDate}</td>
            <td>
              <button onClick={() => updateTask(task.id)}>Update Status</button>
            </td>
            <td>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <label>
        Filter by Status:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </label>
    </div>
  );
};

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");


  useEffect(()=>{
    fetchTask()
  },[])

  const fetchTask = async() => {
    await fetchAllTasks()
  }

  const addTask = async (task) => {
    console.log(task,'addtask');
    await addTaskService(task)
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };

  const updateTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: getNextStatus(task.status) }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "To Do":
        return "In Progress";
      case "In Progress":
        return "Done";
      case "Done":
        return "To Do";
      default:
        return currentStatus;
    }
  };

  return (
    <div className="to-do-card">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default ToDoList;
