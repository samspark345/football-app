import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom'; // Updated import
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../Firebase/firebase";
import axios from 'axios';



const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');


    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Updated hook

    const handleSighUp = async () => {
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser

            if (user) {
                const token = await user.getIdToken()
                // You can perform any validation before submitting
                const fetchData = async () => {
                    try {
//                     console.log(JSON.stringify({
//                         "prescriptionDto": formData,
//                         "patId": Number(patId)
//                     }));

                        console.log({
                            "firstName": firstName,
                            "lastName": lastName,
                            "email": email,
                            "password": password,
                        })

                        const response = await axios.post(
                            'http://localhost:8080/api/staff/register',
                            {
                                myObject : {
                                    "firstName": firstName,
                                    "lastName": lastName,
                                    "email": email,
                                    "password": password,
                                },
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`,
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Credentials": true
                                },
                            }
                        );

                        const result = response.data;
                        // setData(result);
                    } catch (error) {
                        // setError(error);
                        console.log('Caught error:', error);
                    } finally {
                        // setLoading(false);
                    }
                };
                fetchData()
            }
            else{
                console.log('error')
            }

            // Set user data in session variables
            // sessionStorage.setItem('user', JSON.stringify(user));

            // Set role in session variable
            // sessionStorage.setItem('role', role);

            // Navigate to a dashboard page (replace with your desired route)
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.message || 'An error occurred';
            setError(errorMessage);        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
            <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AccountCircle sx={{ fontSize: '50px', marginBottom: '20px' }} />
                <Typography variant="h5" gutterBottom>
                    Sign Up
                </Typography>

                <TextField
                    label="first Name"
                    type="string"
                    fullWidth
                    margin="normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField
                    label="Last name"
                    type="string"
                    fullWidth
                    margin="normal"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <Typography variant="body2" color="error" sx={{ marginTop: '10px' }}>
                        {error}
                    </Typography>
                )}
                <div style={{display: "flex", flexDirection:"row", gap:"5px"}}>
                    <Button variant="contained" color="primary" onClick={handleSighUp} sx={{ marginTop: '20px' }}>
                        Sign Up
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginTop: '20px' }} component={Link} to="/">
                        Cancel
                    </Button>
                </div>
            </Paper>
        </Container>
    );
};

export default SignUpPage;
