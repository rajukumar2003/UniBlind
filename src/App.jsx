import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import WebNorms from "./pages/WebNorms"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPass/>}/>
        <Route path="/webnorms" element={<WebNorms/>}/>
      </Routes>
    </BrowserRouter>
  );
}
