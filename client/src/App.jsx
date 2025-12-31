import { useState } from 'react'
import 'flowbite';
import './App.css'
import './index.css'
import { Button } from "flowbite-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Give from './Pages/Give';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Projects from './Pages/Projects';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './Pages/Dashboard';
import CreatePost from './Pages/CreatePost';
import AdminPost from './Pages/AdminPost';
import UpdatePost from './Pages/UpdatePost';
import Recent from './Pages/Recent';
import PostPage from './components/PostPage';
import PostSuccess from './Pages/postSuccess';
import Contact from './Pages/contact';
import Foodbank from './Pages/Foodbank';
import LiveService from './Pages/LiveService';

function App() {

  return (
  <BrowserRouter>
  <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/LiveService" element={<LiveService />} />
      <Route path="/Give" element={<Give />} />
      <Route path="/Foodbank" element={<Foodbank/>} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/postSuccess" element={<PostSuccess />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/Recent" element={<Recent />} />
      <Route path="/AdminPost" element={<AdminPost />} />
      {/* <Route path="/Search" element={<Search />} /> */}
      <Route path="/post/:postSlug" element={<PostPage />} />
         <Route element={<PrivateRoute />}>
      <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
         {/* <Route element={<OnlyAdminPrivateRoute />}>
        </Route> */}
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/admin-post" element={<AdminPost />} />
      <Route path="/update-post/:postId" element={<UpdatePost />} />
    </Routes>
  <Footer />
  </BrowserRouter>
  )
}

export default App
