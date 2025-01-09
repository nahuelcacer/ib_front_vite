import { jwtDecode } from "jwt-decode";

const authService = {
    setToken(token) {
      localStorage.setItem('auth_token', token);
    },
  
    getToken() {
      return localStorage.getItem('auth_token');
    },
  
    removeToken() {
      localStorage.removeItem('auth_token');
    },
  
    isAuthenticated() {
      return !!this.getToken();
    },
    getUser() {
      const token = this.getToken()
      const decodedToken = jwtDecode(token)
      return decodedToken
    }
  }
  
  export default authService;