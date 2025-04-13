// 初始首頁物件
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("/api/weatherforecast")
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])
    return (
        <>
            <div>首頁</div>
            {
                data ? 
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
        </>
    )
}

export default Home;