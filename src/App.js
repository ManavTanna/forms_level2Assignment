// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobApplicationForm from './pages/Form';
import SubmitPage from './pages/submitPage';
import Background from "./components/Background";

function App() {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path="/" element={<JobApplicationForm />} />
        <Route path="/submitted" element={<SubmitPage />} />
      </Routes>
    </Router>
  );
}

export default App;
