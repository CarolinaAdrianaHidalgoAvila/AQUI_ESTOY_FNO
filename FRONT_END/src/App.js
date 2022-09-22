import {  BrowserRouter , Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import './App.css'
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
const linksArray = ['Pets', 'About Us' , "Contact Us"]

function App() {
  return (
    <>
      <Navbar links={linksArray}/>
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
