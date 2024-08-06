// src/Router.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import PersonDetailPage from "./components/PersonDetailPage";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/person/:id" element={<PersonDetailPage />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
