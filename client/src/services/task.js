import axios from "axios";
import { toast } from "react-toastify";

export function addTask(body) {
  const authToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshtoken");
  const headers = {
    authorization: authToken,
    refreshToken,
  };
  return axios
    .post(`http://localhost:5001/task/add`, body, {
      headers,
    })
    .then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        return {
          body: response.data,
        };
      }
      throw new Error("Status code is not okk");
    })
    .catch((err) => {
      console.error({ err }, "Error in endpoint");
      if (err?.response?.status == 401) {
        toast.error(err.response.data.errorMessage);
      } else {
        toast.error("Something Went Wrong");
      }
    });
}

export function deleteTask(taskId) {
  const authToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshtoken");
  const headers = {
    authorization: authToken,
    refreshToken,
  };

  return axios
    .delete(`http://localhost:5001/task/delete/${taskId}`, {
      headers,
    })
    .then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        toast("Task deleted successfully");
        return {
          message: "Task deleted successfully",
        };
      }
      throw new Error("Status code is not ok");
    })
    .catch((err) => {
      console.error({ err }, "Error in endpoint");
      if (err?.response?.status === 401) {
        toast.error(err.response.data.errorMessage);
      } else {
        toast.error("Something Went Wrong");
      }
    });
}

export function fetchAllTasks(sortBy) {
  const authToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshtoken");
  const headers = {
    authorization: authToken,
    refreshToken:refreshToken,
  };
  return axios
    .get(`http://localhost:5001/task/to-do-list?sortBy=${sortBy}`, {
      headers,
    })
    .then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        return {
          body: response.data,
        };
      }
    })
    .catch((err) => {
      console.error({ err }, "Error in endpoint");
      if (err.response.status == 401) {
        toast.error(err.response.data.errorMessage);
        localStorage.setItem('token','');
      } else {
        toast.error("Something Went Wrong");
      }
    });
}


export function updateTask(taskId, status) {
    const authToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshtoken");
    const headers = {
      authorization: authToken,
      refreshToken,
    };
    const body = {
        taskId,
        status
    }
  
    return axios
      .post(`http://localhost:5001/task/update`,body, {
        headers,
      })
      .then((response) => {
        console.log(response);
        if (response && response.status === 200) {
          toast("Task Status Updated successfully");
          return {
            message: "Task Status Updated successfully",
          };
        }
        throw new Error("Status code is not ok");
      })
      .catch((err) => {
        console.error({ err }, "Error in endpoint");
        if (err?.response?.status == 401) {
          toast.error(err.response.data.errorMessage);
        } else {
          toast.error("Something Went Wrong");
        }
      });
  }