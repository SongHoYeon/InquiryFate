// import { useRef } from 'react/cjs/react.development';
// import io from 'socket.io-client';

// export const SocketCallbacks = () => {
//     const test = useRef(() => {});
//     const a = "A"

//     const setTest = (cb) => {
//         test.current = cb;
//     }
//     const getA = () => {
//         return 'a'
//     }
//     return "A"
// }
// let isSend = false;
// export default class SocketInstance {
//     static instance = null;
//     static socketConn = null;
//     static online = false;
//     static ResponseGetFateCallback;
//     static ResponseUserDBCallback;

//     setResponseGetFateCallback (cb) {
//         SocketInstance.ResponseGetFateCallback = cb;
//     }
//     setResponseUserDBCallback (cb) {
//         SocketInstance.ResponseUserDBCallback = cb;
//     }
//     static getInstance() {
//         if (SocketInstance.instance === null) {
//             SocketInstance.instance = new SocketInstance();
//             SocketInstance.getSocket();
//         }
        
//         return this.instance;
//     }

//     static setResponseGetFateCallback(cb) {
//         SocketInstance.ResponseGetFateCallback = cb;
//     }
//     static getSocket() {
//         if (SocketInstance.socketConn === null) {
//             SocketInstance.socketConn = io.connect("https://b92997ab1136.ngrok.io", { forceNew: true, transports: ['websocket'], });
//             SocketInstance.socketConn.on('connect', () => {
//                 console.warn('socket running in shared instance');
//                 SocketInstance.online = true;

//                 SocketInstance.socketConn.on('ResponseGetFate', (data) => {
//                     SocketInstance.ResponseGetFateCallback(data);
//                 });
//                 SocketInstance.socketConn.on('ResponseUserDB', (data) => {
//                     SocketInstance.ResponseUserDBCallback(data);
//                 });
//             });
//             SocketInstance.socketConn.on('disconnect', () => {
//                 console.warn('--socket disconnected in shared instance--');
//                 SocketInstance.online = false;
//             });
//         }
//         return this.socketConn;
//     }

//     send(protocol, data) {
//         if (SocketInstance.socketConn !== null) {
//             isSend = true;
//             SocketInstance.socketConn.emit(protocol, data);
//         } else {
//             SocketInstance.getSocket();
//         }
//     }

//     // listen(protocol, func) {
//     //     if (SocketInstance.socketConn !== null) {
//     //         SocketInstance.socketConn.on(protocol, (data) => {
//     //             // if (isSend)
//     //                 func(data);
//     //             isSend = false;
//     //         });
//     //     } else {
//     //         SocketInstance.getSocket();
//     //     }
//     // }

//     isOnline() {
//         if (SocketInstance.socketConn !== null) {
//             if (SocketInstance.socketConn.connected === false) {
//                 SocketInstance.getSocket();
//             }
//             return SocketInstance.socketConn.connected;
//         } else {
//             SocketInstance.getSocket();
//             return false;
//         }
//     }
// }
