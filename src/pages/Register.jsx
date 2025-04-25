import { useState } from "react";
const Register = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.id.value);
        console.log(e.target.password.value);
        console.log(e.target.confirmPassword.value);
    }

    // 確認密碼是否與密碼相同
    const confirmPassword = (e) => {
        if (e.target.value !== e.target.password.value) {
            e.target.setCustomValidity("密碼不相同");
            setIsDisabled(true);
        } else {
            e.target.setCustomValidity("");
            setIsDisabled(false);
        }
    }
    return (
        <div>
            <h1>註冊</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="帳號" name="id" />
                <input type="password" placeholder="密碼" name="password" />
                <input type="password" placeholder="確認密碼" name="confirmPassword" onChange={confirmPassword} />
                <button type="submit" disabled={isDisabled}>註冊</button>
            </form>
        </div>
    )
}

export default Register;