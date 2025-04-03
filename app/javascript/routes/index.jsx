import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Capture from "../components/Capture";
import Checks from "../components/Checks";
import Invoices from "../components/Invoices";
import Companies from "../components/Companies";

export default (
  <Router>
    <Home />
    <Routes>
      <Route path="/" element={<Capture />} />
      <Route path="/checks" element={<Checks />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/companies" element={<Companies />} />
    </Routes>
  </Router>
);
