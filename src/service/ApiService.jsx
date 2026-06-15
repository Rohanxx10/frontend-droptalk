
import api, { fileApi, url } from "./Axios";

import { getToken } from "./UserService";


export const createUser= (userData)=>{

    return api.post("/create-user",userData);
}

export const loginUser=(userData)=>{
    return  api.post("/login-user",userData);
}

export const userProfile = (userName) => {
  const token = localStorage.getItem("token");

  return api.get(`/user-profile/${userName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const search = (userName) => {
  const token = localStorage.getItem("token");

  return api.get(`/search-user?name=${userName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function getPreviousChats(sender, receiver) {
  return api.get(`/conversations`, {
    params: { sender, receiver },
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
}

export function uploadFile(file,token){
  const formData = new FormData();
  formData.append("file", file); //  

  return fileApi.post("/upload",formData,{

    headers: {
      Authorization: `Bearer ${token}`
    }

  });

}

export function isValidToken(){
  console.log("api" ,url);
   const token = localStorage.getItem("token");
   return api.post("/token-validation",token);

}

export const isExistUser = (username) => {
  return api.post(`/isExist-user?username=${encodeURIComponent(username)}`);
};

export const isExistUserEmail = (email) => {
  return api.post(`/isExist-email?email=${encodeURIComponent(email)}`);
};



