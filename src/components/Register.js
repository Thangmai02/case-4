import { useNavigate } from "react-router-dom";
import './Register.css'; // Import the CSS file

export default function Register() {
    const navigate = useNavigate();

    const handCLicktoLogin = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <div className="register-box">
                <h1>Register Page</h1>
                <input placeholder={"User name"} />
                <input placeholder="Password" />
                <button>Register</button>
                <h3>
                    Bạn đã có tài khoản ?
                    <div onClick={handCLicktoLogin}>
                        Login now
                    </div>
                </h3>
            </div>
        </div>
    );
}
