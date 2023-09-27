import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase-config';
import { useNavigate } from 'react-router-dom';


export const Login = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();


    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        }
        catch (error:any) {
            console.log(error.message);
        }
        navigate("/");
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
                    <button onClick={login} className='register-button'>Login</button>
            </div>
        </div>
)

}