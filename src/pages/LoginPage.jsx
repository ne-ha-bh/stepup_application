import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/login", {
                email,
                password,
            });

            const { access_token, role, email: userEmail } = response.data; // Destructure email as userEmail

            // Store the token, role, and email in local storage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("role", role);
            localStorage.setItem("email", userEmail); // Store userEmail

            // Redirect based on role
            if (role === "learner") {
                navigate("/participant_data");
            } else if (role === "capdev") {
                navigate("/upload");
            } else {
                alert("Unknown role. Please contact admin.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid email or password. Please try again.");
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                sx={{ mt: 2 }}
            >
                Login
            </Button>
        </Box>
    );
}