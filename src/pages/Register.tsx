import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


export const Register = () => {

    
    const register = async () => {

    }


    return (
        <div className="register-container">
            <div className="register">
                <form>
                    <h1>Sign Up!</h1>
                    <div className='register-email'>
                        <FontAwesomeIcon icon={faEnvelope} className='emailIcon' />
                        <input type="text" placeholder="Email..." />
                    </div>
                    <div className='register-password'>
                        <FontAwesomeIcon icon={faLock} className='passIcon' />
                        <input type="password" placeholder="Password..." />
                    </div>
                    <button className='register-button'>Register</button>
                </form>
            </div>
        </div>
    )
}