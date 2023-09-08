import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import Logout from "./Logout";

function AuthButtons() {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  return isAuthenticated ? <Logout /> : <Login />;
}

export default AuthButtons;

// app.post('/events', (req, res) => {
//   try {
//     const searchFormData = req.body;

//     res.json({ message: 'Data received successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
