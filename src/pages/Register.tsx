import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react';
import { auth, db } from "../config/Firebase-config"
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore';
import { useForm } from 'react-hook-form';


interface createUsers {
    email: string;
    username: string;
    userID: string;
    posts: number;
    followers: number;
}

export const Register = () => {

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate();
    
    const userRef = collection(db,"Users");


    const { register, handleSubmit } = useForm<createUsers>({

    });



    const registerUser = async (data: createUsers) => {
        try {
            const newUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            addDoc(userRef, {
                ...data,
                userID: newUser.user.uid,
                posts: 0,
                followers: 0,
            })
        }
        catch (error:any) {
            console.log(error.message);
        }
        navigate("/");
    }


    return (
        <form onSubmit={handleSubmit(registerUser)}>
        <div className="register-container">
            <div className="register">
                    <h1>Sign Up!</h1>
                    <div className='register-username'>
                        <FontAwesomeIcon icon={faUser} className='usernameIcon' />
                        <input type="text" placeholder="Username..." {...register("username")} onChange={(e) => setRegisterUsername(e.target.value)} />
                    </div>
                    <div className='register-email'>
                        <FontAwesomeIcon icon={faEnvelope} className='emailIcon' />
                        <input type="text" placeholder="Email..." {...register("email")} onChange={(e) => setRegisterEmail(e.target.value)} />
                    </div>
                    <div className='register-password'>
                        <FontAwesomeIcon icon={faLock} className='passIcon' />
                        <input type="password" placeholder="Password..." onChange={(e) => setRegisterPassword(e.target.value)} />
                    </div>
                    <input type="submit" className='register-button' />
            </div>
        </div>
        </form>
    )
}