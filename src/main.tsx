import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

import { router } from './pages';
import { Toaster } from './components/Toaster';
import { IS_LOGGED_IN, TOKEN } from './constants/common';

const queryClient = new QueryClient();

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://68.183.228.130:4000';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

if (IS_LOGGED_IN) axios.defaults.headers.token = TOKEN;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    // eslint-disable-next-line no-console
    console.error('Axios request error:', error);
    return Promise.reject(error);
  },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);
