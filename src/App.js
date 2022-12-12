import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import Action from "./components/Action";
import ButtonAppBar from "./components/UsersAppBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <ButtonAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/action" element={<Action />} />
        <Route path="/action/:id" element={<Action />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
