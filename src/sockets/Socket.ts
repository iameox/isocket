import { IMessage } from 'messages';
import { ISocket, ISocketState, SocketState } from 'sockets';

export class Socket implements ISocket {
    protected _socket: WebSocket;
    private _state: ISocketState;

    public constructor(url: string) {
        this._socket = new WebSocket(url);
        this._state = new SocketState();

        this._socket.addEventListener('open', () => {
            const onMessage = this._onMessage.bind(this);

            this._socket.addEventListener('message', onMessage);
            this._socket.addEventListener('close', () => {
                this._socket.removeEventListener('message', onMessage);
            }, { once: true });
        }, { once: true });
    }

    public get state(): ISocketState {
        return this._state;
    }

    public set state(state: ISocketState) {
        this._state = state;
    }

    public async send<TData = unknown>(message: IMessage<TData>): Promise<void> {
        if (this._socket.readyState != WebSocket.OPEN)
            return;

        try {
            this._socket.send(JSON.stringify({
                type: message.type,
                data: message.data
            }));

        } catch (error) {
            console.warn(error);
        }
    }

    public close(): void {
        this._socket.close();
    }

    protected async _onMessage(event: MessageEvent<string>): Promise<void> {
        try {
            const message = JSON.parse(event.data);
            if (typeof message.type != 'string')
                return;

            await this._state.onMessage(this, {
                type: message.type,
                data: message.data
            });

        } catch (error) {
            console.warn(error);
        }
    }
}