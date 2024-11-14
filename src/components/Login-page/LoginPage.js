import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate} from 'react-router-dom'; // Updated import
import {signInWithEmailAndPassword, signInWithPopup, getAuth, createUserWithEmailAndPassword
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
            setError('')

            console.log('logged in')
        } catch (err) {
            const errorMessage = err.message || 'An error occurred';
            setError(errorMessage);        }
    };


    const handleGoogleSignIn = async () => {
        googleProvider.setCustomParameters({ prompt: 'select_account' });
        try {
            
          await signInWithPopup(auth, googleProvider);
          setError('')
          console.log("User signed in");
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

  const textStyle = {
    input: { color: "white" },          // Sets input text color to white
    "& .MuiInputLabel-root": { color: "white" }, // Sets label color to white
  }
     


    return (
        <div className="login-page" >
            <Container className="login-page" maxWidth="sm" >
                    <div className='login-logo-div'>
                        <img src={require('../../images/logo.png')}  alt='' className='login-logo'></img>
                    </div>
                    <Typography variant='h2' style={{fontWeight: 700, alignSelf:"center" }}>
                        {isSignup? "Create an Account!" : "Welcome Back!" }
                    </Typography>
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
                        variant='filled'
                        value={email}
                        sx={textStyle}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        required
                        fullWidth
                        margin="normal"
                        variant='filled'
                        value={password}
                        sx={textStyle}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {isSignup &&<TextField
                        label="First name"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant='filled'
                        value={firstName}
                        sx={textStyle}
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    />}

                    {isSignup && <TextField
                        label="Last name"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant='filled'
                        value={lastName}
                        sx={textStyle}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />}
                    
                    {error && (
                        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
                            {error}
                        </Typography>
                    )}

                    <Button variant="contained" fullWidth color="primary" onClick={isSignup? handleSignUp : handleLogin} 
                    sx={{ marginTop: '20px' }}>
                        {isSignup? "SignUp" : "Login"}
                    </Button>
                    <Typography variant="body2" sx={{ marginTop: '10px',  marginBottom: '10px', alignSelf:"center" }}>
                            OR
                    </Typography>
                    <button type="button" className="login-with-google-btn" onClick={handleGoogleSignIn}>
                        Sign in with Google
                    </button>
            </Container>
        </div>
    );
};

export default LoginPage;
