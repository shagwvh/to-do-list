import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  addTask as addTaskService,
  deleteTask as deleteTaskService,
  fetchAllTasks,
} from "../../services/task";
import "./ToDoList.css";
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
  const [selectedDate, setSelectedDate] = useState("");

  // Handler for date change
  const handleDateChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setSelectedDate(dateString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, status, priority, selectedDate });
    setTitle("");
    setDescription("");
    setStatus("To Do");
    setPriority("Low");
    setSelectedDate("");
    toggle();
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Add New Task
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader close={closeBtn}>Add Task</ModalHeader>
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
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium"> Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label>
              Status:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => handleSubmit(e)}>
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
  console.log(tasks, "tasks");
  return (
    <div>
      <Table className="todolist-table">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            <Th>Priority</Th>
            <Th>Due Date</Th>
            <Th>Update Status</Th>
            <Th>Delete Task</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task) => (
            <Tr key={task.id}>
              <Td>
                <strong>{task.title}</strong>
              </Td>
              <Td>
                {task.description.length > 14
                  ? task.description.slice(0, 14) + "..."
                  : task.description}
              </Td>
              <Td> {task.status}</Td>
              <Td> {task.priority}</Td>
              <Td> {task.dueDate}</Td>
              <Td>
                <button onClick={() => updateTask(task.id)}>
                  Update Status
                </button>
              </Td>
              <Td>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
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

const TaskSort = ({ sortBy, setSortBy }) => {
    return (
        <div>
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="due_date">Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </label>
      </div>
    );
  };

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState('due_date'); // Default sort by date

  useEffect(() => {
    fetchTask();
  }, [sortBy]);

  const fetchTask = async () => {
    const data = await fetchAllTasks(sortBy);
    if (data && data.body) {
      console.log(data);
      setTasks(data.body.result);
    }
  };

  const addTask = async (task) => {
    console.log(task, "addtask");
    await addTaskService(task);
    fetchTask();
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

  const deleteTask = async (taskId) => {
    await deleteTaskService(taskId);
    fetchTask();
  };

  const filteredAndSortedTasks = 
    filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);


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
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>Task Manager</h1>
      <div className="to-do-card">
        <TaskForm addTask={addTask} />
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskSort sortBy={sortBy} setSortBy={setSortBy}/>
      </div>

      <TaskList
        tasks={filteredAndSortedTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default ToDoList;
