import { IMessage, IMessageHandler } from 'messages';
import { ISocket, ISocketState } from 'sockets';

export class SocketState implements ISocketState {
    private _handlers: Map<string, IMessageHandler>;

    public constructor() {
        this._handlers = new Map();
    }

    public get handlers(): Set<IMessageHandler> {
        return new Proxy(new Set(this._handlers.values()), {
            get: (target, name, receiver) => {
                const property = Reflect.get(target, name);
                if (typeof property != 'function')
                    return property == target ? receiver : property;

                return (...args: any[]) => {
                    if (name == 'add')
                        this._handlers.set(args[0].type, args[0]);

                    else if (name == 'delete')
                        this._handlers.delete(args[0].type);

                    else if (name == 'clear')
                        this._handlers.clear();

                    const result = property.bind(target)(...args);
                    return result == target ? receiver : result;
                };
            }
        });
    }

    public async onMessage(socket: ISocket, message: IMessage): Promise<void> {
        const handler = this._handlers.get(message.type);

        if (handler?.validate(message.data))
            return handler.onMessage(socket, message);
    }
}