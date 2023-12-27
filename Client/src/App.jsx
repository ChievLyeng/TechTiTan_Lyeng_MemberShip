import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import SignUp from "../pages/Signup";
import LogIn from "../pages/Login";
import Homepage from "../pages/Homepage";
import TopAppBar from "../components/TopAppBar";
import ForgotPassword from "../pages/Forgetpassword";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <TopAppBar />
      <Routes>
        <Route
          path="/"
          element={user ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={!user ? <LogIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUp />: <Navigate to="/" />} />
        <Route path="/forgotpassword" element={!user ? <ForgotPassword />: <Navigate to="/signup" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
