
import { BrowserRouter as Router, Routes,Route,Navigate } from 'react-router-dom'
import React from 'react'
import LoginForm from './pages/Auth/LoginForm'
import SignUpForm from './pages/Auth/SignUpForm';
import Home from './pages/Dashboard/Home';
import CreatePoll from './pages/Dashboard/CreatePoll';
import MyPolls from './pages/Dashboard/MyPolls';
import VotedPolls from './pages/Dashboard/VotedPolls';
import Bookmarks from './pages/Dashboard/Bookmarks';
import UserProvider from './context/UserContext';


const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<LoginForm />} />
            <Route path="/signUp" exact element={<SignUpForm />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/create-poll" exact element={<CreatePoll />} />
            <Route path="/my-poll" exact element={<MyPolls />} />
            <Route path="/voted-polls" exact element={<VotedPolls />} />
            <Route path="/bookmarked-polls" exact element={<Bookmarks />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App


//Definig thenrrot component to handle initial redirection

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (<Navigate to="/dashboard" />) : (
    <Navigate to="/login" />
  )
}