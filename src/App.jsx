import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Projects from './Pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePost'
import PostPage from './components/PostPage'
import ScrollToTop from './components/ScrollToTop'
import Search from './Pages/Search'


export default function App() {
  return (
   <BrowserRouter>
   <ScrollToTop />
   <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Search" element={<Search />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/post/:postSlug" element={<PostPage />} />
         <Route element={<PrivateRoute />}>
      <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
         <Route element={<OnlyAdminPrivateRoute />}>
        </Route>
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/update-post/:postId" element={<UpdatePost />} />
    </Routes>
    <Footer />
   </BrowserRouter>
  )
}
