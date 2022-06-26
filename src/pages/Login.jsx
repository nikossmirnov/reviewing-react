import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyBtn from "../components/UI/button/MyBtn";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
    }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='Enter Login'/>
                <MyInput type='password' placeholder='Enter Login'/>
                <MyBtn >
                    Login
                </MyBtn>
            </form>
        </div>
    );
};

export default Login;