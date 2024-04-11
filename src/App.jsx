import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import WebNorms from "./pages/WebNorms";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import Channels from "./pages/Channels";
import CreateConfession from "./pages/CreateConfession";
import EventDisplay from "./Components/EventDisplay";
import SignInHandler from './pages/SignInHandler'

export default function App() {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPass />} />
          <Route path="/webnorms" element={<WebNorms />} />
          <Route path="/dashboard" element={<Dashboard isPostFormOpen={isPostFormOpen} setIsPostFormOpen={setIsPostFormOpen} />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/confession/create" element={<CreateConfession />} />
          <Route path="/events" element={<EventDisplay />} />
          <Route path="/complete-signin" element={<SignInHandler />} />
          
        </Routes>
        </BrowserRouter>
  );
}
