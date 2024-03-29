import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react';
import { auth, db } from "../config/Firebase-config"
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { userSchema } from '../Validations/UserValidation'
import { yupResolver } from '@hookform/resolvers/yup'



interface createUsers {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export const Register = () => {

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const navigate = useNavigate();
    
    const userRef = collection(db,"Users");


    const { register, handleSubmit, formState:{errors} } = useForm<createUsers>({
        resolver: yupResolver(userSchema)
    });



    const registerUser = async (data: createUsers) => {
        try {
            const newUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            addDoc(userRef, {
                ...data,
                userID: newUser.user.uid,
                profilePicture: "src/components/avatar.png",
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
                    <p style={{color:"red"}}>{errors.username?.message}</p>
                    <div className='register-email'>
                        <FontAwesomeIcon icon={faEnvelope} className='emailIcon' />
                        <input type="text" placeholder="Email..." {...register("email")} onChange={(e) => setRegisterEmail(e.target.value)} />
                    </div>
                    <p style={{color:"red"}}>{errors.email?.message}</p>
                    <div className='register-password'>
                        <FontAwesomeIcon icon={faLock} className='passIcon' />
                        <input type="password" placeholder="Password..." {...register("password")} onChange={(e) => setRegisterPassword(e.target.value)} />
                    </div>
                    <p style={{color:"red"}}>{errors.password?.message}</p>
                    <div className='register-password'>
                        <FontAwesomeIcon icon={faLock} className='passIcon' />
                        <input type="password" placeholder="Confirm Password..." {...register("confirmPassword")} onChange={(e) => setRegisterConfirmPassword(e.target.value)} />
                    </div>
                    <p style={{color:"red"}}>{errors.confirmPassword?.message}</p>
                    <input type="submit" className='register-button' />
            </div>
        </div>
        </form>
    )
}