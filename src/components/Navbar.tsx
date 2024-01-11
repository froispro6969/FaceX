import { Link } from 'react-router-dom'
import { auth, db } from "../config/Firebase-config"
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { useUserList } from "./UsersProvider";




export const Navbar = () => {

    const [user] = useAuthState(auth);
    const userList = useUserList();
    const logout = async () => {
        await signOut(auth);
    }

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
                        <div>{userList.map((users) => (
                            <div key={users.userID}>
                                <p>{users.username}</p>
                            </div>
                        ))}
                        </div>

                        <button onClick={logout}>Log out</button>
                    </div>
                }

            </div>
        </nav>
    )
}