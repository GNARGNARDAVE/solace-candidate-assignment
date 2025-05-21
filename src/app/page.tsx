'use client';

import { useEffect, useState } from 'react';
import React from 'react';

import ErrorDisplay from '@/app/components/ErrorDisplay';
import PhraseSearch from '@/app/components/PhraseSearch';
import ResultsTable from '@/app/components/ResultsTable';
import { TResultsHeaders } from '@/app/types/components/results-table';
import { TAdvocate } from '@/app/types/advocate';

import styles from './page.module.scss';
import {filterAdvocates} from "@/app/utils/filter-advocates";

export default function Home() {
    const [advocates, setAdvocates] = useState<TAdvocate[]>([]);
    const [filteredAdvocates, setFilteredAdvocates] = useState<TAdvocate[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getData = async () => {
            const data = await fetch('/api/advocates').then(response => {
                return response
                    .json()
                    .catch(err => {
                        setError(err.message);
                        setAdvocates([]);
                        setFilteredAdvocates([]);
                    });
            });
            setAdvocates(data);
            setFilteredAdvocates(data);
        };

        getData();
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchTerm = e.target.value;

        if (!searchTerm.length) {
            resetSearch();
            return;
        }
        const filteredAdvocates = filterAdvocates(advocates, searchTerm);

        setSearchTerm(e.target.value);
        setFilteredAdvocates(filteredAdvocates);
    };

    const resetSearch = (): void => {
        setSearchTerm('');
        setFilteredAdvocates(advocates);
    };

    const columnHeaders: TResultsHeaders<TAdvocate>[] = [
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

    return (
        <main className={styles.pageContainer}>
            <div className={styles.title} data-testid={'homeTitle'}>
                <h1>Solace Advocates</h1>
            </div>
            <PhraseSearch searchTerm={searchTerm} onChange={onChange} onClick={resetSearch} />
            <ResultsTable<TAdvocate> colDefs={columnHeaders} results={filteredAdvocates} />
            <ErrorDisplay error={error} onClick={() => setError('')} />
        </main>
    );
}
