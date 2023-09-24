import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import './App.css'

function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route   />
        </Routes>
      </Router>
    </div>
  )
}

export default App
