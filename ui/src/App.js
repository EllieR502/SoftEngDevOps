import { sizeHeight } from "@mui/system";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminView from "./AdminView/AdminView";
import LoginPage from "./LoginPage/LoginPage";
import UserView from "./UserView/UserView";

const Tickets = [
  {
    id: 1,
    title: "Do the shit",
    assignee: "Ell",
    status: "To Do",
  },
  {},
];

function App() {
  return (
    <Routes>
      {/* need a signup page */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="/" element={<UserView />} />
    </Routes>
  );
}

export default App;
