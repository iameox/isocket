export interface IMessage<TData = unknown> {
    readonly type: string;
    readonly data: TData;
}