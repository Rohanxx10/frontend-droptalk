import { useState } from "react";
import "../css/component/Login.css";
import { Link , useNavigate} from "react-router-dom";
import api from "../service/Axios";
import { loginUser } from "../service/ApiService";



function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate=useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const loginData = await loginUser(form);

   
    const login = loginData.data;

    console.log("storing", login.firstName);
    localStorage.clear();

    localStorage.setItem("firstName", login.firstName ?? "");
    localStorage.setItem("lastName", login.lastName ?? "");
    localStorage.setItem("message", login.message ?? "");
    localStorage.setItem("profilePicture", login.profilePicture ?? "");
    localStorage.setItem("username", login.username ?? "");
    localStorage.setItem("email", login.email ?? "");
    localStorage.setItem("token", login.token ?? "");
    navigate('/');

  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p>Login to continue using DropTalk</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <div className="login-footer">
          <a href="#">Forgot password?</a>
          <span>
            Don’t have an account? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
