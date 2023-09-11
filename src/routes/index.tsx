import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { ItemDetailPage } from "../pages/ItemDetailPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/item/:id" Component={ItemDetailPage} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
