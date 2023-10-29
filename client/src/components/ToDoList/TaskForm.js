import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { DatePicker } from "antd";

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

export default TaskForm


