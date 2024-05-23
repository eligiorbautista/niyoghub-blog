import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import OneTimePassword from "./pages/OneTimePassword";
import PageNotFound from "./pages/PageNotFound";
import BrowseNotes from "./pages/BrowseNotes";
import CreateNote from "./pages/CreateNote";
import Home from "./pages/Home";
import Authenticator from "./components/Authenticator";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" replace />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Registration />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Authenticator>
              <Home />
            </Authenticator>
          }
        />
        <Route
          path="/new-note"
          element={
            <Authenticator>
              <CreateNote />
            </Authenticator>
          }
        />
        <Route
          path="/my-notes"
          element={
            <Authenticator>
              <BrowseNotes />
            </Authenticator>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/recovery" element={<ForgotPassword />} />
        <Route path="/new-password" element={<ChangePassword />} />
        <Route path="/otp" element={<OneTimePassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
