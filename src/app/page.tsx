'use client';

import { useEffect, useState, FC } from 'react';
import React from 'react';

import ErrorDisplay from '@/app/components/ErrorDisplay';
import PhraseSearch from '@/app/components/PhraseSearch';
import ResultsTable from '@/app/components/ResultsTable';
import { TResultsHeaders, TTableSort } from '@/app/types/components/results-table';
import { TAdvocate } from '@/app/types/advocate';

import styles from './page.module.scss';
import { filterAdvocates } from '@/app/utils/filter-advocates';

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [tableSort, setTableSort] = useState<TTableSort<TAdvocate>>({ sort: 'ASC', key: COLUMN_HEADERS[0].key });

    const getData = async () => {
        const url = tableSort?.key && tableSort?.sort ? `/api/advocates?key=${tableSort.key}&sort=${tableSort.sort}` : '/api/advocates';

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
    }, []);

    useEffect(() => {
        getData();
    }, [tableSort]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchTerm = e.target.value;

        if (!searchTerm.length) {
            resetSearch();
            return;
        }
        const filteredAdvocates = filterAdvocates(advocates, searchTerm);

        setSearchTerm(e.target.value);
        setTableSort({ sort: 'ASC', key: COLUMN_HEADERS[0].key });
        setFilteredAdvocates(filteredAdvocates);
    };

    const resetSearch = (): void => {
        setSearchTerm('');
        setTableSort({ sort: 'ASC', key: COLUMN_HEADERS[0].key });
        setFilteredAdvocates(advocates);
    };

    return (
        <main className={styles.pageContainer}>
            <div className={styles.title} data-testid={'homeTitle'}>
                <h1>Solace Advocates</h1>
            </div>
            <PhraseSearch searchTerm={searchTerm} onChange={onChange} onClick={resetSearch} />
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
