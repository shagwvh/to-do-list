import React, { useEffect, useState } from "react";
import {
  addTask as addTaskService,
  deleteTask as deleteTaskService,
  updateTask as updateTaskService,
  fetchAllTasks,
} from "../../services/task";
import "./ToDoList.css";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";


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
    const history = useNavigate()
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState('due_date'); // Default sort by date

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
        history('/');
    }else{
      fetchTask();
    }
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

  const updateTask = async (taskId, status) => {
    console.log(taskId, status, "updateTask");
    await updateTaskService(taskId, status)
    fetchTask();
  };

  const deleteTask = async (taskId) => {
    await deleteTaskService(taskId);
    fetchTask();
  };

  const filteredAndSortedTasks = 
    filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Header/>
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
