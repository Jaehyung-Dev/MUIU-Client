import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReactDOM from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot 방식으로 렌더링
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
