import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import './styles/App.css'
import './styles/Navbar.css'
import './styles/Register.css'
import { Register } from './pages/Register'

function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
