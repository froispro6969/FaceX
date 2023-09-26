import { Link } from 'react-router-dom'
import { auth } from "../config/Firebase-config"
import { useAuthState } from 'react-firebase-hooks/auth'

export const Navbar = () => {

    const [user] = useAuthState(auth);

    return (
        <nav className="navbar-container container">
            <h1 className="navbar-logo">FaceX</h1>
            <div className="navbar-link">
                <Link to={"/"} >Home</Link>
                <Link to={"/profile"}>Profile</Link>
            </div>
            <div className='navbar-right'>
                {!user ?
                    <div className='navbar-sign'>
                        <Link to={"/login"}>Sign in</Link>
                        <Link to={"/register"}>Create account</Link>
                    </div>
                    :
                    <div className='navbar-userInfo'>
                    <p>{user?.email}</p>
                    <button>Log out</button>
                    </div>
                }

            </div>
        </nav>
    )
}