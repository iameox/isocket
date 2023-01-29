import { IMessage, IMessageHandler } from 'messages';
import { ISocket } from 'sockets';

export interface ISocketState {
    readonly handlers: Set<IMessageHandler>;

    onMessage(socket: ISocket, message: IMessage): Promise<void>;
}