import "./App.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import { useEffect } from "react";
import ProfilePage from "./pages/Profile/HomePage";
import DailyTaskPage from "./pages/DailyTask/DailyTaskPage";
import MonthlyTaskPage from "./pages/MonthlyTask/MonthlyTaskPage";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:5000/";

  const { user, refresh } = useSelector((state) => {
    return state;
  });
  // Destructure login and user details from the Redux store
  const { login, detials } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Check if the user is logged in and update the Redux store accordingly
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/auth/check");
      dispatch({
        type: "user",
        payload: { login: data.loggedIn, detials: data.user },
      });
    })();
  }, [refresh]);

  // Logging to check if login is successful

  return (
    <div className="App">
      <Routes>
        {login ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dailytask" element={<DailyTaskPage />} />
            <Route path="/monthlytask" element={<MonthlyTaskPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
