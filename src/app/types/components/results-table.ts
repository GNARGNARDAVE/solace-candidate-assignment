import { ReactNode } from 'react';
export type TSort = 'ASC' | 'DESC';

export type TSearchParams<T> = {
    key: keyof T | null;
    input: string | null;
};

export type TTableSort<T> = {
    key: keyof T;
    sort: TSort;
};

export type TResultsHeaders<T> = {
    label: string;
    key: keyof T;
    valueFormatter: (param: Partial<T>) => string | number | ReactNode;
    id?: string;
};

export interface IResultsTable<T> {
    updateSearch: (params: TTableSort<T>) => void;
    colDefs: TResultsHeaders<T>[];
    results: T[];
    sortDefault: TTableSort<T>;
}
