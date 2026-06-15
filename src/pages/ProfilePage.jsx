import { useEffect, useState } from "react";
import "../css/component/userProfile.css";
import { userProfile } from "../service/ApiService";
import { FaUserCircle } from "react-icons/fa";
import { deleteAllData } from "../service/UserService";

// 👇 your B2 bucket base URL — change to your actual bucket URL
const BACKEND_URL  = import.meta.env.VITE_APP_API_URL;

function UserProfile() {
  const [user, setUser] = useState(null); // null = still loading
  const [imgError, setImgError] = useState(false);


  const handleLogout = () => {
   
    deleteAllData();
    window.location.reload();
  };
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) return;

        const profile = await userProfile(username);
        console.log("API response:", profile.data); // debug

        const rawPhoto = profile.data.profilePicture;

        // Build full URL if backend only returns filename
        const photoUrl = rawPhoto
          ? `${BACKEND_URL}/files/download?fileName=${encodeURIComponent(rawPhoto)}`
          : null;

       setUser({
  username: profile.data.username,
  email: profile.data.email,
  lastName: profile.data.lastName,
  firstName: profile.data.firstName,
  photoUrl: rawPhoto || null,   
});
      } catch (e) {
        console.error("Profile fetch error:", e);
      }
    };

    fetchProfile();
  }, []);

  // loading state
  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p style={{ textAlign: "center" }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* TOP SECTION */}
        <div className="profile-top">
          {/* Avatar — fallback to icon if no URL or image fails to load */}
          {user.photoUrl && !imgError ? (
            <img
              src={user.photoUrl}
              alt="profile"
              className="profile-avatar"
              onError={() => {
                console.error("Image failed to load:", user.photoUrl); // debug
                setImgError(true); // 👈 fallback to icon if 403 or broken URL
              }}
            />
          ) : (
            <FaUserCircle className="profile-avatar-icon" />
          )}

          <div className="profile-basic">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p className="username">@{user.username}</p>
            <p className="email">{user.email}</p>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="profile-info-grid">
          <div className="info-box">
            <span>First Name</span>
            <p>{user.firstName}</p>
          </div>
          <div className="info-box">
            <span>Last Name</span>
            <p>{user.lastName}</p>
          </div>
          <div className="info-box">
            <span>Username</span>
            <p>{user.username}</p>
          </div>
          <div className="info-box">
            <span>Email</span>
            <p>{user.email}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
