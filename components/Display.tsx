"use client"

import { useEffect, useState } from "react";
import { Component } from "./Slate-component";

export const Display = () => {
    const [text, setText] = useState<string>("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(()=> {
        const ws = new WebSocket("ws://localhost:8000");
        ws.onopen = () => {
            console.log("Connected to server");
            setText("Connected to server")
        }
        ws.onmessage = (message) => {
            setText(message.data);
        }
        setSocket(ws);
        return () => {
            ws.close();
        }
    }, [])
    return (
        <div className="h-screen" >
            {/* <textarea className="min-h-screen w-full bg-transparent border-none focus:outline-none pt-10 px-10 text-lg resize-none overflow-hidden" onChange={(e) => console.log(e.target.value)} placeholder="Type here" /> */}
            <Component />
        </div>
    )
}