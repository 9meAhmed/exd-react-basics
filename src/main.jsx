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

import { Provider } from "react-redux";
import { store } from "./store.js";

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <BrowserRouter>


        <AuthProvider>
          <Routes>

            <Route path="/" element={<App />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/home" element={<App />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>



          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </>
)
