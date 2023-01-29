export interface IServerRequest {
    readonly path: string;

    readonly parameters: {
        readonly path: Map<string, Set<string>>;
        readonly query: Map<string, Set<string>>;
    };
}