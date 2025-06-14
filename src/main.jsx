import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import AuthProviders from './providers/AuthProviders';
import { Toaster } from 'react-hot-toast'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
        <Toaster />
      <RouterProvider router={router} />
    </AuthProviders>
  </React.StrictMode>
);