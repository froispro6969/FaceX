import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className="navbar-container">
            <h1 className="navbar-logo">FaceX</h1>
            <div className="navbar-link">
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
            </div>
            <div className='navbar-sign'>
                <Link to={"/login"}>Sign in</Link>
                <Link to={"/register"}>Create account</Link>
            </div>
        </div>
    )
}