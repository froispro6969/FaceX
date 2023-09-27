import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react';
import { auth } from "../config/Firebase-config"
import { useNavigate } from 'react-router-dom'



export const Register = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate();
    


    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
        }
        catch (error:any) {
            console.log(error.message);
        }
        navigate("/");
    }


    return (
        <div className="register-container">
            <div className="register">
                    <h1>Sign Up!</h1>
                    <div className='register-email'>
                        <FontAwesomeIcon icon={faEnvelope} className='emailIcon' />
                        <input type="text" placeholder="Email..." onChange={(e) => setRegisterEmail(e.target.value)} />
                    </div>
                    <div className='register-password'>
                        <FontAwesomeIcon icon={faLock} className='passIcon' />
                        <input type="password" placeholder="Password..." onChange={(e) => setRegisterPassword(e.target.value)} />
                    </div>
                    <button onClick={register} className='register-button'>Register</button>
            </div>
        </div>
    )
}