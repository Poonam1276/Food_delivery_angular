import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = () => {
  const token = localStorage.getItem('authToken');
  console.log("Token:", token);

  if (!token) {
    alert('🚫 Access Denied: No token found.');
    return false;
  }

  try {
    const user: any = jwtDecode(token);
    console.log("Decoded user:", user);

    const role = user.Role; // ✅ lowercase 'role'
    console.log("User role:",  role);

    if (role === 'Admin') {
      return true;
    }

    alert('🚫 Access Denied: You are not authorized to view this page.');
    return false;
  } catch (err) {
    console.error("you cant access it.",err);
    alert('🚫 Access Denied: Invalid token.');
    return false;
  }
};