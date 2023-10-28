import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
