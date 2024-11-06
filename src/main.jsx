import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Input from "./Pages/Input";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="body">
      <Input />
    </div>
  </StrictMode>
);
