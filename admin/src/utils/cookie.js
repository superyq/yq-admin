import Cookies from "js-cookie";
 
const TokenKey = "token";
const ExpiresInKey = "User-Expires-In";
 
export function getToken() {
  return Cookies.get(TokenKey);
}
 
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
 
export function removeToken() {
  return Cookies.remove(TokenKey);
}