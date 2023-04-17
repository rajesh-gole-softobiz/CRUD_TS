import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserView from "./pages/users/UserView";
import UserEdit from "./pages/users/UserEdit";
import UserAdd from "./pages/users/UserAdd";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/all-users" element={<UserView />} />
      <Route path="/edituser/:id" element={<UserEdit />} />
      <Route path="/adduser/:id" element={<UserAdd />} />
    </Routes>
  );
};

export default AppRoutes;
