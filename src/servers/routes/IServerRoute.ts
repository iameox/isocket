import { IServerRequest } from 'servers';
import { ISocket } from 'sockets';

export interface IServerRoute<TRequest extends IServerRequest> {
    onUpgrade(request: TRequest): Promise<void>;
    onOpen(socket: ISocket, request: TRequest): Promise<void>;
    onClose(socket: ISocket): Promise<void>;
}