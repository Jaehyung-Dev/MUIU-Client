import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

// 여기서 'react-dom'이 아니라 'react-dom/client'를 가져와야 해

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
