import { sizeHeight } from "@mui/system";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminView from "./AdminView/AdminView";
import LoginPage from "./LoginPage/LoginPage";
import UserView from "./UserView/UserView";
import SignUpPage from "./SignUpPage/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="/tickets" element={<UserView />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
