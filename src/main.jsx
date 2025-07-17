import "./index.css";
import App from "./App.jsx";
import EmpCURD from "./components/EmpCURD.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <EmpCURD/>
  </StrictMode>,
)
