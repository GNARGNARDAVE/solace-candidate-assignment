'use client';

import React, { FC } from 'react';

import ErrorDisplay from '@/app/components/ErrorDisplay';
import PhraseSearch from '@/app/components/PhraseSearch';
import ResultsTable from '@/app/components/ResultsTable';
import { useFetchSort } from '@/app/hooks/use-fetch-sort';
import { TResultsHeaders, TTableSort } from '@/app/types/components/results-table';
import { TAdvocate } from '@/app/types/advocate';

import styles from './page.module.scss';

const COLUMN_HEADERS: TResultsHeaders<TAdvocate>[] = [
    {
        label: 'First Name',
        key: 'firstName',
        valueFormatter: (param: Partial<TAdvocate>) => param.firstName ?? '',
    },
    {
        label: 'Last Name',
        key: 'lastName',
        valueFormatter: (param: Partial<TAdvocate>) => param.lastName ?? '',
    },
    {
        label: 'City',
        key: 'city',
        valueFormatter: (param: Partial<TAdvocate>) => param.city ?? '',
    },
    {
        label: 'Degree',
        key: 'degree',
        valueFormatter: (param: Partial<TAdvocate>) => param.degree ?? '',
    },
    {
        label: 'Specialties',
        key: 'specialties',
        valueFormatter: (param: Partial<TAdvocate>) => param.specialties?.join(', ') ?? '',
    },
    {
        label: 'Years of Experience',
        key: 'yearsOfExperience',
        valueFormatter: (param: Partial<TAdvocate>) => param.yearsOfExperience ?? '',
    },
    {
        label: 'Phone Number',
        key: 'phoneNumber',
        valueFormatter: (param: Partial<TAdvocate>) => param.phoneNumber ?? '',
    },
];

const Home: FC = () => {
    const { data, error, fetchData, queryParams, setError, setQueryParams } = useFetchSort<TAdvocate>({
        url: '/api/advocates',
        sort: 'ASC',
        defaultSortKey: COLUMN_HEADERS[0].key,
    });

    const onSearch = () => fetchData();

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setQueryParams({
            ...queryParams,
            searchParams: {
                ...queryParams.searchParams,
                key: e.target.value as keyof TAdvocate,
            },
        });
    };

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchTerm = e.target.value;
        setQueryParams({
            ...queryParams,
            searchParams: {
                ...queryParams.searchParams,
                input: searchTerm,
            },
        });
    };

    const resetSearch = (): void => {
        setQueryParams({
            tableSort: {
                sort: 'ASC',
                key: COLUMN_HEADERS[0].key,
            },
            searchParams: {
                key: '',
                input: '',
            },
        });
    };

    return (
        <main className={styles.pageContainer}>
            <div className={styles.title} data-testid={'homeTitle'}>
                <h1>Solace</h1>
                <div className={styles.header}>Advocates</div>
                <p>Find an advocate who will help untangle your healthcare by phone or video—no matter what you need—covered by Medicare.</p>
            </div>
            <ResultsTable<TAdvocate>
                id="advocateResultsTable"
                colDefs={COLUMN_HEADERS}
                sortDefault={{
                    sort: queryParams.tableSort.sort,
                    key: queryParams.tableSort.key,
                }}
                results={data}
                updateSearch={({ key, sort }: TTableSort<TAdvocate>) =>
                    setQueryParams({
                        ...queryParams,
                        tableSort: {
                            key,
                            sort,
                        },
                    })
                }>
                <PhraseSearch<TAdvocate>
                    count={data.length}
                    colDefs={COLUMN_HEADERS}
                    searchSelect={queryParams.searchParams.key}
                    searchTerm={queryParams.searchParams.input}
                    onTextChange={onTextChange}
                    onSelectChange={onSelectChange}
                    onSearch={onSearch}
                    onClick={resetSearch}
                />
            </ResultsTable>
            <ErrorDisplay error={error} onClick={() => setError('')} />
        </main>
    );
};

export default Home;
