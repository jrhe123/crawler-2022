import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
//
import Login from "./pages/login";
import Home from "./pages/home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to={"/login"} replace={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
