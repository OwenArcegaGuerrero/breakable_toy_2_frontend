import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/Login";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
