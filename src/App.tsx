import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import './styles/App.css'
import './styles/Navbar.css'
import './styles/Register_and_Login.css'
import './styles/Home.css'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
