import { IServerRequest, IServerRoute } from 'servers';

export interface IServer<TRequest extends IServerRequest> {
    readonly routes: Set<IServerRoute<TRequest>>;

    close(): Promise<void>;
}