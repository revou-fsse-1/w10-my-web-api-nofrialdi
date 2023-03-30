// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Appheader from "./Appheader";
import Detailmember from "./Detailmember";
import { ToastContainer } from "react-toastify";
import Editmember from "./Editmember";
import Addmember from "./Addmember";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" autoClose="1500"></ToastContainer>
      <Appheader></Appheader>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/member/detail/:id" element={<Detailmember />}></Route>
          <Route path="/member/edit/:id" element={<Editmember />}></Route>
          <Route path="/member/add/" element={<Addmember />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
