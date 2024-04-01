import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import WebNorms from "./pages/WebNorms";
import PostForm from "./Components/PostForm";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import { UserProvider } from "./userContext";
import Channels from "./pages/Channels";
import CreateConfession from "./pages/CreateConfession";

export default function App() {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<PostForm isOpen={isPostFormOpen} onClose={() => setIsPostFormOpen(false)} />} />
          <Route path="/forgotpassword" element={<ForgotPass />} />
          <Route path="/webnorms" element={<WebNorms />} />
          <Route path="/dashboard" element={<Dashboard isPostFormOpen={isPostFormOpen} setIsPostFormOpen={setIsPostFormOpen} />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/confession/create" element={<CreateConfession />} />
          
        </Routes>
        </BrowserRouter>
    </UserProvider>
  );
}
