import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div>
            後台管理
            <div>
                <Link to="/admin/dashboard">後台管理</Link>
                <Link to="/admin/record">打卡記錄查詢</Link>
                <Link to="/admin/error-fix">錯誤修正</Link>
                <Link to="/admin/item-detail">商品明細</Link>
                <Link to="/admin/sale-rank">銷售排行榜</Link>
                <Link to="/admin/stock">庫存管理</Link>
                <Link to="/">回到前台</Link>
            </div>
            <Outlet />
        </div>
    )
}

export default AdminLayout