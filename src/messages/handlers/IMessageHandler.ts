import { IMessage } from 'messages';
import { ISocket } from 'sockets';

export interface IMessageHandler<TData = unknown> {
    readonly type: string;

    onMessage(socket: ISocket, message: IMessage<TData>): Promise<void>;

    validate(data: unknown): data is TData;
}