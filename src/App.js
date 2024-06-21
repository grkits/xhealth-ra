import "./App.css";
import { useEffect, useState } from "react";
import MainLayout from "./layouts/main_layout/MainLayout";
import Login from "./components/Login/Login";
import ResetPassword from "./components/Reset-Password/ResetPassword";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LOGIN_PATH, RESET_PWD } from "./constants";
import { Worker } from '@react-pdf-viewer/core';

function App() {
  const [user, setUser] = useState(localStorage.getItem("userName"));

  useEffect(() => {
    if (
      localStorage.getItem("userName") === null &&
      window.location.pathname !== LOGIN_PATH &&
      window.location.pathname !== RESET_PWD
    ) {
      window.location.assign(LOGIN_PATH);
    }
    function storageEventHandler(event) {
      if (event.key === "userName") {
        const name = event.newValue;
        setUser(name);
      }
    }
    window.addEventListener("storage", storageEventHandler);
    return () => {
      window.removeEventListener("storage", storageEventHandler);
    };
  }, []);

  return (
    <div className="App">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"></Worker>
      {user ? (
        <MainLayout />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
