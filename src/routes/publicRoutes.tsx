import { Navigate, Route, Routes } from "react-router-dom";
import Login from "container/Login/index";
import Signup from "container/Signup/index";
import ForgotPassword from "container/ForgotPassword";

export default function PublicRoutes() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
