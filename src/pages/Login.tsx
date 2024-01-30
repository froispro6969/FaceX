import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../config/Firebase-config';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';





export const Login = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();
    const userRef = collection(db, "Users");

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        }
        catch (error: any) {
            console.log(error.message);
        }
        navigate("/");
    }

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        const q = query(userRef, where("email", "==", result.user.email));
        const isUserInDatabase = await getDocs(q);

        if (isUserInDatabase.empty) {
            addDoc(userRef, {
                email: result.user.email,
                username: result.user.displayName,
                userID: result.user.uid,
            })
            navigate("/");
            location.reload();
        }
        else {
            navigate("/");
            location.reload();
        }
    }





    return (
        <div className="login-container">
            <div className="login">
                <h1>Sign in!</h1>
                <div className='login-email'>
                    <FontAwesomeIcon icon={faEnvelope} className='emailIcon' />
                    <input type="text" placeholder="Email..." onChange={(e) => setLoginEmail(e.target.value)} />
                </div>
                <div className='login-password'>
                    <FontAwesomeIcon icon={faLock} className='passIcon' />
                    <input type="password" placeholder="Password..." onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
                <div className='login-by-google'>
                    <button onClick={signInWithGoogle}>Sign in with Google</button>
                </div>
                <button onClick={login} className='login-button'>Login</button>
            </div>
        </div>
    )

}