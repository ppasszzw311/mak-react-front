// 登入頁面
import React, { useState } from 'react';
import { loginPost } from "@/api/login";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./Login.module.scss";

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLogin({
            ...login,
            [id]: value
        });
    }

    const handleClick = async () => {
        // call login API
        const response = await loginPost(login.username, login.password);
        if (response) {
            // handle success
            if (response.user != "") {
                alert('登入成功');
                navigate('/');
            }
        } else {
            console.log('登入失敗');
            // handle error
        }
    }

    return (
        <div className={`${styles.container}`}>
                <h1>登入</h1>
                <label htmlFor="username">帳號</label>
                <input type="text" id="username" value={login.userName} onChange={handleChange} />
                <label htmlFor="password">密碼</label>
                <input type="password" id="password" value={login.password} onChange={handleChange} />
            <Link to="/register">註冊</Link>
            <button onClick={handleClick}>登入</button>

        </div>
    )
}

export default Login;