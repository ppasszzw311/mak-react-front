// 初始首頁物件
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("https://www.mak-web.zeabur.app/weatherforecast")
        .then((res) => {
            setData(res.data);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    const handleClick = () => {
        axios.get("http://www.net-api.zeabur.internal:8080/weatherforecast")
        .then((res) => {
            setData(res.data);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <div>首頁</div>
            {
                data && Array.isArray(data) ? 
                (
                    data.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.date}, {item.temperatureC}, {item.summary}, {item.temperatureF}
                            </div>
                        )
                    })
                ) : 
                <div>沒有資料</div>
            }
            <button onClick={handleClick}>點擊</button>
        </>
    )
}

export default Home;