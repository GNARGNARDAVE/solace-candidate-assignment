'use client';

import { useEffect, useState, FC } from 'react';
import React from 'react';

import ErrorDisplay from '@/app/components/ErrorDisplay';
import PhraseSearch from '@/app/components/PhraseSearch';
import ResultsTable from '@/app/components/ResultsTable';
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
    const [advocates, setAdvocates] = useState<TAdvocate[]>([]);
    const [filteredAdvocates, setFilteredAdvocates] = useState<TAdvocate[]>([]);
    const [searchParams, setSearchParams] = useState<any>({ key: '', input: '' });
    const [error, setError] = useState<string>('');
    const [tableSort, setTableSort] = useState<TTableSort<TAdvocate>>({ sort: 'ASC', key: COLUMN_HEADERS[0].key });

    const getData = async () => {
        let url = '/api/advocates';
        const sortingParams = tableSort?.key && tableSort?.sort ? `&key=${tableSort.key}&sort=${tableSort.sort}` : '';
        const searchingParams = searchParams.input && searchParams.key ? `&searchKey=${searchParams.key}&searchInput=${searchParams.input}` : '';
        const queryParams = sortingParams.concat(searchingParams).slice(1);
        url = queryParams.length ? `${url}?${queryParams}` : url;

        const data = await fetch(url).then(response => {
            return response.json().catch(err => {
                setError(err.message);
                setAdvocates([]);
                setFilteredAdvocates([]);
            });
        });
        setAdvocates(data);
        setFilteredAdvocates(data);
    };

    useEffect(() => {
        getData();
    }, [tableSort]);

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchTerm = e.target.value;
        setSearchParams({
            ...searchParams,
            input: searchTerm,
        });
    };

    const onSearch = () => getData();

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSearchParams({
            ...searchParams,
            key: e.target.value,
        });
    };

    const resetSearch = (): void => {
        setSearchParams({
            ...searchParams,
            input: '',
        });
        setTableSort({ sort: 'ASC', key: COLUMN_HEADERS[0].key });
        setFilteredAdvocates(advocates);
    };

    return (
        <main className={styles.pageContainer}>
            <div className={styles.title} data-testid={'homeTitle'}>
                <h1>Solace</h1>

                <h2>Advocates</h2>
            </div>
            <PhraseSearch
                colDefs={COLUMN_HEADERS}
                searchSelect={searchParams.key}
                searchTerm={searchParams.input}
                onTextChange={onTextChange}
                onSelectChange={onSelectChange}
                onSearch={onSearch}
                onClick={resetSearch}
            />
            <ResultsTable<TAdvocate>
                id="advocateResultsTable"
                colDefs={COLUMN_HEADERS}
                results={filteredAdvocates}
                updateSearch={({ key, sort }: TTableSort<TAdvocate>) =>
                    setTableSort({
                        key,
                        sort,
                    })
                }
            />
            <ErrorDisplay error={error} onClick={() => setError('')} />
        </main>
    );
};

export default Home;
