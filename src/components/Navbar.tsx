import { Link } from 'react-router-dom'
import { auth, db } from "../config/Firebase-config"
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface Users {
    email: string;
    username: string;
    userID: string;
}



export const Navbar = () => {

    const [user] = useAuthState(auth);
    const userRef = collection(db,"Users");
    const [userList, setUserList] = useState<Users[]>([]);

    const logout = async () => {
        await signOut(auth);
    }


    const getUsers = async () => {
        try{
            const usersQuery = query(userRef, where("userID","==","jwcxtuDOuRd05kddMK8rSMGZ4wl2"));
            const data = await getDocs(usersQuery);
            setUserList(data.docs.map((doc) => ({ ...doc.data()})) as Users[]);
            console.log(userList)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

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
                    <p>{userList[0]?.username}</p>
                    <button onClick={logout}>Log out</button>
                    </div>
                }

            </div>
        </nav>
    )
}