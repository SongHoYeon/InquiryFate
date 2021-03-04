// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:4001";
// export let socket;

// // socket.emit("InsertUser", 'adsfsadfasdfasd')
// // socket.on("Test", data => {
// //     console.log(data)
// // });

// export const SocketConnect = () => {
//     if (socket !== null)
//         socket = socketIOClient(ENDPOINT);
// }

// export const RequestFate = (users) => {
//     socket.emit("RequestFate", users)
// }

// // export const GetUserDB = () => {
// //     socket.emit("RequestUserDB", "");
// // }

// export const TestSocket = () => {
//     if (socket !== null)
//         socket = socketIOClient(ENDPOINT);

//     const GetUserDB = () => {
//         socket.emit("RequestUserDB", "");
//     }
// }



import io from 'socket.io-client';

export default class SocketInstance {
    static instance = null;
    static socketConn = null;
    static online = false;

    static getInstance() {
        if (SocketInstance.instance === null) {
            SocketInstance.instance = new SocketInstance();
            SocketInstance.getSocket();
        }
        return this.instance;
    }

    static getSocket() {
        if (SocketInstance.socketConn === null) {
            SocketInstance.socketConn = io.connect("127.0.0.1:4001", { forceNew: true });
            SocketInstance.socketConn.on('connect', () => {
                console.warn('socket running in shared instance');
                SocketInstance.online = true;
            });
            SocketInstance.socketConn.on('disconnect', () => {
                console.warn('--socket disconnected in shared instance--');
                SocketInstance.online = false;
            });
        }
        return this.socketConn;
    }

    send(protocol, data) {
        if (SocketInstance.socketConn !== null) {
            SocketInstance.socketConn.emit(protocol, data);
        } else {
            SocketInstance.getSocket();
        }
    }

    listen(protocol, func) {
        if (SocketInstance.socketConn !== null) {
            SocketInstance.socketConn.on(protocol, (data) => {
                func(data);
            });
        } else {
            SocketInstance.getSocket();
        }
    }

    isOnline() {
        if (SocketInstance.socketConn !== null) {
            if (SocketInstance.socketConn.connected === false) {
                SocketInstance.getSocket();
            }
            return SocketInstance.socketConn.connected;
        } else {
            SocketInstance.getSocket();
            return false;
        }
    }
}
