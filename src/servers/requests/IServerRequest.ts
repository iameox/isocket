export interface IServerRequest {
    path: string;

    parameters: {
        path: Map<string, string>;
        query: Map<string, Set<string>>;
    };
}