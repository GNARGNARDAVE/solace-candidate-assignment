import { useState } from 'react';
import { TTableSort, TSort } from '@/app/types/components/results-table';

export const useSort = <T>() => {
    const [sorting, setSorting] = useState<TTableSort<T>>(null);

    const orderBy = (params: TTableSort<T>) => {
        const { key, sort } = params;

        let updatedOrder: TSort = 'ASC';
        if (key === sorting?.key) {
            switch (sort) {
            case 'ASC':
                updatedOrder = 'DESC';
                break;
            case 'DESC':
                updatedOrder = 'ASC';
                break;
            default:
                updatedOrder = 'ASC';
            }
        }

        setSorting({
            key,
            sort: updatedOrder,
        });
    };

    return {
        key: sorting?.key,
        sort: sorting?.sort,
        orderBy,
    };
};
