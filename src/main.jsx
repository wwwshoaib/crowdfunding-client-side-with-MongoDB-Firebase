import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import AuthProviders from './providers/AuthProviders';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'


const queryClient = new QueryClient()
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <Toaster />
        <RouterProvider router={router} />
    </AuthProviders>
      
    </QueryClientProvider>
    
  </React.StrictMode>
);