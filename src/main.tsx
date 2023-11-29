import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UsersProvider } from './components/UsersProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UsersProvider>
        <App />
    </UsersProvider>
  </React.StrictMode>,
)
