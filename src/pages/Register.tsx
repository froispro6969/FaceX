import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'

export const Register = () => {
    return (
        <div className="register-container">
            <div className="register">
                <h1>Sign Up!</h1>
                <div className='register-login'>
                    <FontAwesomeIcon icon={faUser} className='userIcon' />
                    <input type="text" placeholder="Login..."></input>
                </div>
                <div className='register-email'>
                    <FontAwesomeIcon icon={faEnvelope} className='emailIcon' />
                    <input type="text" placeholder="Email..." />
                </div>
                <div className='register-password'>
                    <FontAwesomeIcon icon={faLock} className='passIcon'/>
                    <input type="password" placeholder="Password..." />
                </div>
                <button className='register-button'>Register</button>
            </div>
        </div>
    )
}