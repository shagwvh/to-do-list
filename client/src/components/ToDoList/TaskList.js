import React from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

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
              <Tr key={task.id} className={task.status === "To Do" ? 'to-do' : task.status === "In Progress" ? 'in-progress' : 'done'}            >
                <Td>
                  <strong>{task.title}</strong>
                </Td>
                <Td title={task.description}>
                  {task.description.length > 14
                    ? task.description.slice(0, 14) + "..."
                    : task.description}
                </Td>
                <Td> {task.status}</Td>
                <Td> {task.priority}</Td>
                <Td> {task.dueDate}</Td>
                <Td>
                <label>
                <select
                  value={task.status}
                  onChange={(e) => updateTask(task.id,e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </label>
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

export default TaskList