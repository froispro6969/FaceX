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
    const [userUid, setUserUid] = useState<string | null>(null);

    const logout = async () => {
        await signOut(auth);
    }

    useEffect(() => {
        if (user) {
            setUserUid(user.uid); 
        }
    }, [user]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                if (userUid) {
                    const usersQuery = query(userRef, where("userID", "==", userUid)); // Filter users by logged-in user's ID
                    const data = await getDocs(usersQuery);
                    setUserList(data.docs.map((doc) => ({ ...doc.data(), userID: doc.id })) as Users[]);
                } else {
                    console.log("User UID is not available");
                }
            } catch (err) {
                console.log(err);
            }
        };

        getUsers(); 

    }, [userUid]); // Fetch users when userUid is available

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