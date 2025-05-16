import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

// 建立聊天室
const ChatRoom = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_URL}/chathub`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log("Connected to chat hub");

                    connection.on("ReceiveMessage", (user, message) => {
                        setMessages((prevMessages) => [...prevMessages, { user, message }]);
                    });

                    // 監聽資料庫異動的東西
                    connection.on("ReceiveDatabaseChange", (user, message) => {
                        console.log(user, message)
                        setMessages((prevMessages) => [...prevMessages, { user, message }]);
                    });
                })
                .catch((err) => {
                    console.error("Error connecting to chat hub:", err);
                });
            
        }
    }, [connection]);

    const sendMessage = () => {
        console.log(user, message);
        console.log('送出簡訊');
        if (connection && connection.state === signalR.HubConnectionState.Connected) {
            try {
                connection.invoke("SendMessage", user, message);
                setMessage("");
            } catch (err) {
                console.error("Error sending message:", err);
            }
        }
    };

    const handleUserChange = (e) => {
        setUser(e.target.value);
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div>
            <h2>聊天室</h2>
            <input placeholder="你的姓名" value={user} onChange={handleUserChange} />

            <input placeholder="說說話" value={message} onChange={handleMessageChange} />

            <button onClick={sendMessage}>送出</button>

            <div>
                <ul>
                    {
                        messages.map((msg, idx) => (
                            <li key={idx}>{msg.user}: {msg.message}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ChatRoom;
    