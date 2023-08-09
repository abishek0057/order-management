import socketIo from "socket.io";

export const initializeSocket = (server: any) => {
  const io = new socketIo.Server(server);
  return io;
};
