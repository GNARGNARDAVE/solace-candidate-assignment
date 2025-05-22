import { ReactNode } from 'react';

export type TResultsHeaders<T> = {
    label: string;
    key: keyof T;
    valueFormatter: (param: Partial<T>) => string | number | ReactNode;
    id?: string;
};

export interface IResultsTable<T> {
    colDefs: TResultsHeaders<T>[];
    results: T[];
}
