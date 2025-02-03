import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from "react-router-dom";
import AuthInput from '../../components/input/AuthInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
//Handle login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    //Login api
    try { 
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, password
      });
      const { token, user } = response.data;
      if (token) {
        console.log(token, user);
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong.Please try again");
      }
    }
   };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          PLease Enter your details in log in
        </p>
        <form onSubmit={handleSubmit}>
          <AuthInput
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="nitin@gmail.com"
            type="text"
          />

          <AuthInput
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="min 8 character"
            type="password"
          />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type="submit" className='btn-primary' >LOGIN</button>
          <p className='text-[13px] text-slate-800 mt-3'>Dont have an account? {" "}
            <Link className='font-medium text-primary underline' to="/signup">
            SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default LoginForm
