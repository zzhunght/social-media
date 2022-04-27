import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import 'antd/dist/antd.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './context/auth';
import PostContextProvider from './context/post';
import ProfileContextProvider from './context/profile';
import { BrowserRouter } from 'react-router-dom';
import MesContextProvider from './context/mes';
import SocketContextProvider from './context/socketIo';
import SearchContextProvider from './context/search';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <PostContextProvider>
       <ProfileContextProvider>
         <MesContextProvider>
          <SocketContextProvider>
            <SearchContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SearchContextProvider>
          </SocketContextProvider>
         </MesContextProvider>
       </ProfileContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </QueryClientProvider> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
