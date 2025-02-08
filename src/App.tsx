import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { CreateOrderPage } from "pages";
import Router from "routes/routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
