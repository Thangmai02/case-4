import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const handClicktoRegister = () => {
        navigate('/register');
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const getDataUsn = (event) => {
        setUsername(event.target.value);
    };

    const getDataPwd = (event) => {
        setPassword(event.target.value);
    };

    const submit = () => {
        console.log(username, password);
        if (username === "admin" && password === "admin") {
            navigate('/home');
        } else if (username === '' && password === '') {
            alert("Vui lòng nhập tài khoản và mật khẩu");
        } else {
            alert("Sai tài khoản hoặc mật khẩu");
        }


    };

    return (

        <div className="container">
            <div className="login-box">
                <h1>Login Page</h1>
                <input
                    placeholder={"User name"}
                    type={'text'}
                    name="username"
                    value={username}
                    onChange={getDataUsn}
                />
                <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={getDataPwd}
                />
                <button onClick={submit}>Login</button>
                <h3>
                    Bạn chưa có tài khoản ?
                    <div onClick={handClicktoRegister}>
                        Register now
                    </div>
                </h3>
            </div>
        </div>
    );
}
