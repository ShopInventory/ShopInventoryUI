import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Property to track whether the password is hidden or visible
  hidePassword: boolean = true;
  // Define the login form group
  loginForm!: FormGroup;

  usernameError: string | null = null; // Error message for username
  passwordError: string | null = null; // Error message for password

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.setValues();
  }

  setValues() {
    sessionStorage.clear();
    localStorage.clear();
  }

  initializeForm() {
    // Initialize the form with username and password controls
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    // Reset error messages before validation
    this.usernameError = null;
    this.passwordError = null;

    if (this.loginForm.valid) {
      // Generate a mock JWT token for demo purposes
      const token = this.generateToken();
      console.log('Generated Token:', token);

      // Store token in sessionStorage
      sessionStorage.setItem('authToken', token);
      console.log('Token stored in sessionStorage');

      // Check if credentials match the stored token for authorization
      const isAuthenticated = this.authorizeUser(username, password);

      if (isAuthenticated) {
        console.log('User authorized successfully!');
        this.router.navigate(['/dashboard']);
      } else {
        console.log('Authorization failed. Invalid username or password.');

        // Set the appropriate error messages
        const tokenData: any = jwtDecode(token);
        // const tokenData = this.decodeTokenPayload(token);
        if (tokenData.username !== username) {
          this.usernameError = 'Username does not match';
        }
        if (tokenData.password !== password) {
          this.passwordError = 'Password does not match';
        }
      }
    }
  }

  // Mock JWT Token Generation Function
  generateToken() {
    // In a real application, you'd get the token from the server
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBfYXQiOjE3Mjk1ODI2ODIsImlzc3VlX2F0IjoxNzI5NTgxNDgyLCJyb2xlTmFtZSI6IkFkbWluIiwidXNlcm5hbWUiOiJwcmFzaGFudGRhdjAxIiwicGFzc3dvcmQiOiJwcmFzaGFudGRhdjAxIn0.uj8Jq5AnDgQM0nZjtYKsUNQSRR7P8sB3_mGnIHy1tgs"; // Encoding username and password in base64 (for demo purposes)
    return token;
  }

  // Helper function to decode the base64-encoded JWT payload
  decodeTokenPayload(token: string): any {
    const payloadBase64 = token.split('.')[1]; // Get the payload part of the token
    const decodedPayload = atob(payloadBase64); // Decode the base64 string
    return JSON.parse(decodedPayload); // Parse the decoded payload as JSON
  }

  // Authorize the user by checking the token in sessionStorage
  authorizeUser(username: string, password: string): boolean {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.decodeTokenPayload(token); // Decode the payload part of the token
      return decodedToken.username === username && decodedToken.password === password;
    }
    return false;
  }

  // Logout functionality (clears token from sessionStorage)
  logout(): void {
    sessionStorage.removeItem('authToken');

    this.loginForm.get('username')?.setValue('');
    this.loginForm.get('password')?.setValue('');

    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.log('User logged out. Token removed from sessionStorage.');
      // Navigate back to the login page after logout
      this.router.navigate(['/login']);
    } else {
      console.log('Token was not removed from sessionStorage.');
    }
  }

}

