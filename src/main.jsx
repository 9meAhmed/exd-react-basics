import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import ProtectedLayout from './layouts/ProtectedLayout.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<App />} />
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<App />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
)
