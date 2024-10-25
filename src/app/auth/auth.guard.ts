import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject the Router service
  const token = sessionStorage.getItem('authToken');

  if (token) {
    // Token exists, allow access to the route
    return true;
  } else {
    // Token does not exist, redirect to the login page
    router.navigate(['/authentication/login']); // Redirect to login
    return false;
  }
};
