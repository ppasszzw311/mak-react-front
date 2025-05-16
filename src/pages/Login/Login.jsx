import Login from "@/components/Login";
import styles from "./Login.module.scss"

const LoginPage = () => {
    return (
        <div className={`${styles.wrapper}`}>
            <Login/>
        </div>
    )
}

export default LoginPage
