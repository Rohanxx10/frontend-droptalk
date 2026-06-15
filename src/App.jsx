import { Analytics } from '@vercel/analytics/react';
import "./App.css";
import Headers from "./compnent/header.jsx";
import HeroSection from "./compnent/HeroSection.jsx";
import ChatBox from "./compnent/chat/ChatBox.jsx";
import MidSection from "./compnent/MidSection.jsx";
import Work from "./compnent/Work.jsx";
import Features from "./compnent/Features.jsx";
import Footer from "./compnent/Footer.jsx";
import Overview from "./compnent/Overview.jsx";
import { useEffect, useState } from "react";
import { isValidToken } from "./service/ApiService.jsx";

function App() {

  const [token,setToken]=useState(null);
  const [user,setUser]=useState(null);



  useEffect(()=>{


    const storeToken=localStorage.getItem("token");
    setToken(storeToken);
    console.log("token .. ",token)
    if(token){
    const firstName=localStorage.getItem("firstName");
    const lastName=localStorage.getItem("lastName" );
    const profilePicture=localStorage.getItem("profilePicture");
    const userName=localStorage.getItem("username");
    const email=localStorage.getItem("email");
    console.log("before set user ",user);
      setUser({
        firstName: firstName,
        lastName: lastName,
        photoUrl: profilePicture,
        username: userName,
        email: email
      });
      console.log("after set user ",user);

    }

  },[token]);

  return (
    <>

      <Analytics/>
      <Headers user={user}/>
      <div id="hero">
        <HeroSection/>
        <ChatBox setUser={setUser} />
      </div>
     <MidSection/>
     <Overview/>
      <Work/>
      <Features/>
      <Footer/>

    </>
  );
}

export default App;
