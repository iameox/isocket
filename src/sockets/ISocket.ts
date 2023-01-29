import { IMessage } from 'messages';
import { ISocketState } from 'sockets';

export interface ISocket {
    state: ISocketState;

    send<TData = unknown>(message: IMessage<TData>): Promise<void>;
    close(): void;
}