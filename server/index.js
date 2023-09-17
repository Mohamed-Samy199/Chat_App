// import express from 'express'
// import { Server } from "socket.io";

// const app = express()
// const port = 3001

// app.get("/" , (req , res ) => res.send("Hello World"))
// let server = app.listen(port , () => console.log(`server is running on port ${port}`))

// const io = new Server(server , {
//     cors : '*'
// })

// io.on("connection" , (socket) =>{
//     console.log(`user connected ${socket.id}`);

//     socket.on("join_room" , (data)=>{
//         socket.join(data)
//         console.log(`User With ID: ${socket.id} joined room: ${data}`);
//     })

//     socket.on("send_message" , (data)=>{
//         socket.to(data.room).emit("receive_message" , data)
//     })

//     socket.on('disconnect' , ()=>{
//         console.log("a user disconnected" , socket.id);
//     })
// })






const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors");
const {Server} = require("socket.io")
const port = 3001

app.use(cors());

const server = http.createServer(app)
const io = new Server(server , {
    cors: {
        origin : ["http://localhost:3000","http://localhost:3001","http://localhost:3002","http://localhost:5000"],
        methods : ["GET" , "POST"]
    }
})
io.on("connection" , (socket) =>{
    console.log(`user connected ${socket.id}`);

    socket.on("join_room" , (data)=>{
        socket.join(data)
        console.log(`User With ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message" , (data)=>{
        socket.to(data.room).emit("receive_message" , data)
    })

    socket.on('disconnect' , ()=>{
        console.log("a user disconnected" , socket.id);
    })
})

server.listen(port , ()=>{
    console.log(`Server Is Running ${port}`);
})


