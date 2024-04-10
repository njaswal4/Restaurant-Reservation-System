import { jwtDecode } from "jwt-decode";

//Custom functions for auth
function setToken(token){
    localStorage.setItem('access_token', token);
}

export function getToken() {
  try {
    return localStorage.getItem('token');
  } catch (err) {
    return null;
  }
}

export function removeToken(){
    localStorage.removeItem('token');
}

export function removeUser() {
  localStorage.removeItem('user_id')
}

export function readToken() {
    try {
      const token = getToken();
      return token ? jwtDecode(token) : null;
    } catch (err) {
      return null;
    }
}

export function isAuthenticated(){
    const token = readToken();  
    return (token) ? true : false;
}
