import Home from "@/components/Home";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button/Button";

const HomePage = () => {
    return (
        <Fragment>
            <h1>首頁</h1>
            <Link to="/login">登出</Link>
            <Link to="/register">註冊</Link>
            <div>
                <Link to="/check-in">打卡</Link>
                <Link to="/check-list">打卡記錄查詢</Link>
                <Link to="/purchase">進貨</Link>
                <Link to="/work-shift">交班</Link>
                <Link to="/print-and-sale">列印及銷售</Link>
            </div>
            <div>
                <Link to="/admin/dashboard">後台管理</Link>
            </div>

            <Button>按鈕</Button>
        </Fragment>
    )
}

export default HomePage;