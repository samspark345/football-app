import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom'; // Updated import
import {signInWithEmailAndPassword, signInWithPopup, getAuth, signInWithRedirect, getRedirectResult,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {googleProvider} from "../Firebase/firebase";
import './login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);
    const [isSignup, setIsSignUp] = useState(false)
    const navigate = useNavigate(); // Updated hook
    const auth = getAuth()
    const db = getFirestore()

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(auth.currentUser)
            setError('')

            // Set user data in session variables
            sessionStorage.setItem('user', JSON.stringify(user));

            // Set role in session variable 

            // Navigate to a dashboard page (replace with your desired route)
            console.log('logged in')
        } catch (err) {
            const errorMessage = err.message || 'An error occurred';
            setError(errorMessage);        }
    };


    const handleGoogleSignIn = async () => {
        googleProvider.setCustomParameters({ prompt: 'select_account' });
        try {
            
          const result = await signInWithPopup(auth, googleProvider);
          sessionStorage.setItem('user', JSON.stringify(user));
          // Get the signed-in user
          const user = result.user;
          console.log("User signed in:", user);
        } catch (error) {
          console.error("Error during sign-in:", error.message);
        }
    };

    const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: new Date().toISOString()
      });

      setError('');
      console.log('User signed up and added to Firestore:', user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };
     


    return (
        <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
                <Typography variant='h2' style={{fontWeight: 700, }}>Welcome Back! </Typography>
                <div className="user_login_options_div">
                    <Typography variant="h5" className="user_login_options" gutterBottom
                    style={{textDecoration: isSignup? "none": "underline"}} onClick={() => {setIsSignUp(false)}}>
                        Login
                    </Typography>

                    <Typography variant="h5" className="user_login_options" gutterBottom 
                    style={{textDecoration: isSignup? "underline": "none"}} onClick={() => {setIsSignUp(true)}}>
                        Sign Up
                    </Typography>
                </div>
                <TextField
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    required
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {isSignup &&<TextField
                    label="First name"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                />}

                {isSignup && <TextField
                    label="Last name"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                />}
                
                {error && (
                    <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
                        {error}
                    </Typography>
                )}
                <div style={{display: "flex", flexDirection:"row", gap:"5px"}}>

                    <Button variant="contained" color="primary" onClick={isSignup? handleSignUp : handleLogin} 
                    sx={{ marginTop: '20px' }}>
                        {isSignup? "SignUp" : "Login"}
                    </Button>
                    
                </div>
                <Typography variant="body2" sx={{ marginTop: '10px' }}>
                        or
                </Typography>
                <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </Container>
    );
};

export default LoginPage;
