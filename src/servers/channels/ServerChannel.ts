import { IMessage } from 'messages';
import { IServerChannel } from 'servers';
import { ISocket } from 'sockets';

export class ServerChannel implements IServerChannel {
    protected _sockets: Set<ISocket>;

    public constructor() {
        this._sockets = new Set();
    }

    public get sockets(): Set<ISocket> {
        return this._sockets;
    }

    public async broadcast<TData = unknown>(message: IMessage<TData>): Promise<void> {
        const promises = [];

        for (let socket of this._sockets)
            promises.push(socket.send(message));

        await Promise.allSettled(promises);
    }
}