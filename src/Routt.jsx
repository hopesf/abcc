import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

export default function Routt() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" index element={<App />} />
        <Route path="/coin/:id" element={<div> coin page</div>} />
      </Routes>
    </BrowserRouter>
  );
}
