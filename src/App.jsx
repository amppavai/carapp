import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <>
        <AppBar position="static">
          <Toolbar className="navigation">
            <Typography variant="h6">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/cars">Cars</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      <Outlet />
    </>
  );
}

export default App;

