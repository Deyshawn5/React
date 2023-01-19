import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Friends from "./components/friends/Friends";
import Blogs from "./components/blogs/Blogs";
import Jobs from "./components/jobs/Jobs";
import TechCompanies from "./components/techCompanies/TechCompanies";
import Events from "./components/events/Events";
import TestAjax from "./components/TestAjax";
import UnknownUser from "./components/UnknownUser";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import NewFriend from "./components/friends/NewFriend";
import "./assets.css";

function App() {
  const [user] = useState({
    firstName: "Deyshawn",
    lastName: "Fox",
    isLoggedIn: false,
  });

  return (
    <React.Fragment>
      <SiteNav user={user}></SiteNav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home user={user} />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/friends" element={<Friends />}></Route>
          <Route path="/friends/new" element={<NewFriend />}></Route>
          <Route path="/friends/:friendId/edit" element={<NewFriend />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/techCompanies" element={<TechCompanies />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/testAjax" element={<TestAjax />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/unknownUser" element={<UnknownUser />}></Route>
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
