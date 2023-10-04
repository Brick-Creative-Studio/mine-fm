import { Messenger } from "./Messenger";

export type Message = {
  message: string
  timeSent: string;
  messenger: Messenger;
  roomName: string;
}
