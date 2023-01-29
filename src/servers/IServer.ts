import { IServerChannel, IServerRequest, IServerRoute } from 'servers';

export interface IServer<TRequest extends IServerRequest> {
    readonly routes: Set<IServerRoute<TRequest>>;
    readonly channels: Map<string, IServerChannel>;

    close(): Promise<void>;
}