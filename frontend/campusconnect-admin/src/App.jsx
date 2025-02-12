
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
import { Toaster } from "react-hot-toast";
import AddUser from "./pages/Dashboard/AddUser";
import UserControl from "./pages/Dashboard/UserControl";
import Report from "./pages/Dashboard/Report";
import More from "./pages/Dashboard/More";

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
            <Route path="/add-user" exact element={<AddUser />} />
            <Route path="/user-control" exact element={<UserControl />} />
            <Route path="/report" exact element={<Report />} />
            <Route path="/more" exact element={<More />} />

            <Route path="/bookmarked-polls" exact element={<Bookmarks />} />
          </Routes>
        </Router>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </UserProvider>
    </div>
  );
};

export default App


//Definig thenrrot component to handle initial redirection

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (<Navigate to="/dashboard" />) : (
    <Navigate to="/login" />
  )
}