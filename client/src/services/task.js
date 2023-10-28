import axios from "axios";
import { toast } from "react-toastify";

export function addTask(body) {
  const authToken ='JWT'+localStorage.getItem("token");
  const headers = {
    authorization: authToken,
  };
  return axios
    .post(`http://localhost:5001/task/add`, body, {
      headers,
    })
    .then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        const authToken = response.headers.authorization;
        localStorage.setItem("token", authToken);
        return {
          body: response.data,
          headers: response.headers,
        };
      }
      throw new Error("Status code is not okk");
    })
    .catch((err) => {
      console.error({ err }, "Error in endpoint");
      if (err.response.status == 401) {
        toast.error(err.response.data.errorMessage);
      } else {
        toast.error("Something Went Wrong");
      }
    });
}

export function updateTask(body) {
  return axios
    .post(`http://localhost:5001/task/update`, body)
    .then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        const authToken = response.headers.authorization;
        localStorage.setItem("token", authToken);
        return {
          body: response.data,
          headers: response.headers,
        };
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((err) => {
      console.error({ err }, "Error in endpoint");
      if (err.response.status == 401) {
        toast.error(err.response.data.errorMessage);
      } else {
        toast.error(err.response.data.errorMessage);
      }
    });
}