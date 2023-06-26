import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProtocolsPage from "../pages/AllProtocolsPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={AllProtocolsPage} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
