import { useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './createUser.css';

export default function CreateUser() {

    const username = useRef();
    const designation = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    let Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match");
        }
        else if (designation.current.value === "registrar") {
            alert("Can't create registrar");
        }
        else {
            const user = {
                username: username.current.value,
                designation: designation.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/create", user);
                Navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='cUser'>
            <div className="cUserWrapper">
                <div className="cUserLeft">
                    <h3 className="cUserLogo">JISS</h3>
                    <span className="cUserDesc">
                        You are creating a new user
                    </span>
                </div>
                <form className="cUserRight" onSubmit={handleSubmit}>
                    <div className="cUserBox">
                        <input type="text" required ref={username} placeholder='Username' className='cUserInput'/>
                        <input type="text" required ref={designation} placeholder='designation' className='cUserInput'/>
                        <input type="password" required ref={password} className="cUserInput" placeholder='Password' minLength="6" />
                        <input type="password" required ref={passwordAgain} className="cUserInput" placeholder='Password Again' minLength="6" />
                        <button className="cUserButton" type='submit'>Create User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
