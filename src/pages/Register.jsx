import { useState, useRef } from "react";
import "../css/component/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { createUser, isExistUser, isExistUserEmail } from "../service/ApiService.jsx";

import av1 from "../assets/av1.jpg";
import av2 from "../assets/av2.jpg";
import av3 from "../assets/av3.png";
import av4 from "../assets/av4.jpg";
import av5 from "../assets/av5.png";
import av6 from "../assets/av6.jpg";

const defaultAvatars = [av1, av2, av3, av4, av5, av6];

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "", lastname: "", username: "",
    email: "", password: "", confirmPassword: "", profilePicture: "",
  });

  const [usernameStatus, setUsernameStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const usernameTimer = useRef(null);
  const emailTimer = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "username") {
      setUsernameStatus("");
      if (value.length < 3) return;
      clearTimeout(usernameTimer.current);
      usernameTimer.current = setTimeout(async () => {
        try {
          setUsernameStatus("checking");
          const res = await isExistUser(value);
          setUsernameStatus(res.data === true ? "exists" : "available");
        } catch { setUsernameStatus(""); }
      }, 400);
    }

    if (name === "email") {
      setEmailStatus("");
      if (!/^\S+@\S+\.\S+$/.test(value)) return;
      clearTimeout(emailTimer.current);
      emailTimer.current = setTimeout(async () => {
        try {
          setEmailStatus("checking");
          const res = await isExistUserEmail(value);
          setEmailStatus(res.data === true ? "exists" : "available");
        } catch { setEmailStatus(""); }
      }, 400);
    }
  };

  const urlToFile = async (url, filename) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const handleAvatarSelect = async (avatarUrl) => {
    const file = await urlToFile(avatarUrl, "avatar.jpg");
    setSelectedAvatarUrl(avatarUrl);
    setForm((prev) => ({ ...prev, profilePicture: file }));
    setErrors((prev) => ({ ...prev, profilePicture: "" }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, profilePicture: "Invalid image file" }));
      return;
    }
    setSelectedAvatarUrl("");
    setForm((prev) => ({ ...prev, profilePicture: file }));
    setErrors((prev) => ({ ...prev, profilePicture: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstname) newErrors.firstname = "Required";
    if (!form.lastname) newErrors.lastname = "Required";
    if (!form.username || form.username.length < 3) newErrors.username = "Min 3 characters";
    if (usernameStatus === "exists") newErrors.username = "Username already exists";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Invalid email";
    if (emailStatus === "exists") newErrors.email = "Email already exists";
    if (!form.password || form.password.length < 6) newErrors.password = "Min 6 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!form.profilePicture) newErrors.profilePicture = "Profile picture required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const formData = new FormData();
      formData.append("first_name", form.firstname);
      formData.append("last_name", form.lastname);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("confirm_password", form.confirmPassword);
      formData.append("profilePicture", form.profilePicture);
      await createUser(formData);
      navigate("/login", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>Join DropTalk and start sharing securely</p>

        <div className="row">
          <div className="field-group">
            <input name="firstname" placeholder="First Name"
              onChange={handleChange} className={errors.firstname ? "invalid" : ""} />
            {errors.firstname && <p className="field-error">{errors.firstname}</p>}
          </div>
          <div className="field-group">
            <input name="lastname" placeholder="Last Name"
              onChange={handleChange} className={errors.lastname ? "invalid" : ""} />
            {errors.lastname && <p className="field-error">{errors.lastname}</p>}
          </div>
        </div>

        <div className="field-group">
          <input name="username" placeholder="Username" onChange={handleChange}
            className={usernameStatus === "exists" ? "invalid" : usernameStatus === "available" ? "valid" : ""} />
          {usernameStatus === "checking"  && <p className="field-info">Checking username...</p>}
          {usernameStatus === "exists"    && <p className="field-error">Username already exists</p>}
          {usernameStatus === "available" && <p className="field-success">Username available ✓</p>}
          {errors.username && usernameStatus !== "exists" && <p className="field-error">{errors.username}</p>}
        </div>

        <div className="field-group">
          <input name="email" type="email" placeholder="Email" onChange={handleChange}
            className={emailStatus === "exists" ? "invalid" : emailStatus === "available" ? "valid" : ""} />
          {emailStatus === "checking"  && <p className="field-info">Checking email...</p>}
          {emailStatus === "exists"    && <p className="field-error">Email already exists</p>}
          {emailStatus === "available" && <p className="field-success">Email available ✓</p>}
          {errors.email && emailStatus !== "exists" && <p className="field-error">{errors.email}</p>}
        </div>

        <div className="avatar-section">
          <p className={errors.profilePicture ? "error-text" : ""}>Choose Profile Picture</p>
          {errors.profilePicture && <p className="field-error">{errors.profilePicture}</p>}
          <div className="avatar-list">
            {defaultAvatars.map((avatar, i) => (
              <img key={i} src={avatar} alt={`avatar-${i}`}
                className={selectedAvatarUrl === avatar ? "avatar active" : "avatar"}
                onClick={() => handleAvatarSelect(avatar)} />
            ))}
          </div>
          <label className="upload-btn">
            Upload from Gallery
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </label>
          {form.profilePicture && (
            <img src={URL.createObjectURL(form.profilePicture)} alt="preview" className="preview-img" />
          )}
        </div>

        {/* Password — eye sits INSIDE the input box */}
        <div className="field-group">
          <div className="input-eye-wrap">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={errors.password ? "invalid" : ""}
            />
            <span
              className="eye-toggle"
              onClick={() => setShowPassword((p) => !p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setShowPassword((p) => !p)}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>
          {errors.password && <p className="field-error">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="field-group">
          <div className="input-eye-wrap">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className={errors.confirmPassword ? "invalid" : ""}
            />
            <span
              className="eye-toggle"
              onClick={() => setShowConfirmPassword((p) => !p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setShowConfirmPassword((p) => !p)}
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>
          {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="submit-btn">Sign Up</button>

        <span className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;