import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={100}
          // hideProgressBar
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnVisibilityChange
          draggable
          // pauseOnHover
        />
        <Routes>
          <Route path="/" exact element={<Login />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
