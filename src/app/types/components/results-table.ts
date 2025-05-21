export type TResultsHeaders<T> = {
    label: string;
    key: keyof T;
    valueFormatter: (param: Partial<T>) => string | number; // TODO: Should we add markup?
};

export interface IResultsTable<T> {
    colDefs: TResultsHeaders<T>[];
    results: T[];
}
