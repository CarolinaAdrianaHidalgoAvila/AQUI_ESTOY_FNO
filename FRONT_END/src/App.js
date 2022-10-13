import {  BrowserRouter , Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import './App.css'
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/user' element={<UserProfile/>}></Route>
          <Route exact path='/' element={<HomePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function AppWraper() {
  return (
    <App />
  );
}

export default AppWraper;
