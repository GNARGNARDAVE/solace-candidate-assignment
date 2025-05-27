import { useEffect, useState } from 'react';
import { TSearchParams, TTableSort } from '@/app/types/components/results-table';

interface IFetchSort<T> {
    defaultSortKey: keyof T;
    url: string;
}

type TQueryParams<T> = {
    searchParams: TSearchParams<T>;
    tableSort: TTableSort<T>;
};

export const useFetchSort = <T>({ defaultSortKey, url }: IFetchSort<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string>('');

    const [queryParams, setQueryParams] = useState<TQueryParams<T>>({
        searchParams: { key: null, input: '' },
        tableSort: { sort: 'ASC', key: defaultSortKey },
    });

    // Sorting will trigger a new fetch

    useEffect(() => {
        fetchData();
    }, [queryParams.tableSort]);

    // Fetch Data utilizes the sorting key/value pair as well as takes into the search input and search key.
    // Resetting the table involves resetting the table sort which will trigger the useEffect hook to fetch data
    const fetchData = async () => {
        const { searchParams, tableSort } = queryParams;
        let modifiedUrl = (' ' + url).slice(1);
        const sortingParams = tableSort?.key && tableSort?.sort ? `&key=${tableSort.key}&sort=${tableSort.sort}` : '';
        const searchingParams = searchParams.input && searchParams.key ? `&searchKey=${searchParams.key}&searchInput=${searchParams.input}` : '';
        const combinedQueryParams = sortingParams.concat(searchingParams).slice(1);
        modifiedUrl = combinedQueryParams.length ? `${url}?${queryParams}` : url;

        const data = await fetch(modifiedUrl)
            .then(response => response.json())
            .catch(err => {
                setError(err.message);
                return [];
            });

        setData(data);
    };

    return {
        data,
        error,
        fetchData,
        setQueryParams,
        queryParams,
    };
};
