import io from "socket.io-client";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const socket = io(baseURL!, { autoConnect: false})
