import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Link to="/">首頁</Link>
            <Link to="/login">登出</Link>
            <Outlet />
        </div>
    )
}

export default MainLayout