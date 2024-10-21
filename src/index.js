import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyle';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot 방식으로 렌더링
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <App />
    </React.StrictMode>
);