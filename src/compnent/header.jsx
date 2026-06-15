import { FaFileAlt, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import "../css/component/header.css";
import { useNavigate } from "react-router-dom";
import { deleteAllData } from "../service/UserService";

function Headers({ user }) {
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();

  const handleLogout = () => {
   
    deleteAllData();
    window.location.reload();
  };

  const handleProfile=()=>{
    navigate('/user-profile')
  }

  const handleSignup=()=>{
    navigate("/register")
  }

  return (
    <header id="header">
      <div id="logo">
        <FaFileAlt size={32} />
        <h2>DropTalk</h2>
      </div>

      <nav id="menu-item">
        <a href="#work"><h3>How it works</h3></a>
        <a href="#features"><h3>Features</h3></a>

        {/* IF USER NOT LOGGED IN */}
        {(!user ) ? (
          <button id="signUp" onClick={handleSignup}>Sign up</button>
        ) : (
          <div className="profile-wrapper">
            <FaUserCircle
              size={34}
              className="profile-icon"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <img
                    src={user.photoUrl}
                    alt="profile"
                    className="profile-img"
                  />

                  <div className="profile-info">
                    <p className="username">{user.username}</p>
                    <p className="email">{user.email}</p>
                  </div>
                </div>

                <div className="profile-actions">
                  <button onClick={handleProfile}>View Profile</button>
                  <button className="logout-btn" onClick={handleLogout}>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Headers;
