import { IMessage } from 'messages';
import { ISocket } from 'sockets';

export interface IServerChannel {
    readonly sockets: Set<ISocket>;

    broadcast<TData = unknown>(message: IMessage<TData>): Promise<void>;
}