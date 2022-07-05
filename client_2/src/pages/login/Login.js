import { useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core';
import './login.css';

function Login() {

    const username = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        loginCall({ username: username.current.value, password:password.current.value }, dispatch);
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">JISS</h3>
                    <span className="loginDesc">
                        Welcome to JISS
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input type="text" className="loginInput" placeholder='Username' required ref={username}/>
                        <input
                            type="Password"
                            className="loginInput"
                            placeholder='Password'
                            required
                            minLength="6"
                            ref={password} />
                        <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color='secondary' size="20px"/> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password</span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
