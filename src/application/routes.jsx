import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Budget from "../pages/Budget";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="/Budget/" element={<Budget />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
