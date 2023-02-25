import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

function App() {
    return (
        <div>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/login" element={<Login />}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
