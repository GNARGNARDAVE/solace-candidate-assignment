import React from 'react';
import { IResultsTable, TResultsHeaders } from '@/app/types/components/results-table';
import styles from './results-tables.module.scss';

export default function ResultsTable<T>(props: IResultsTable<T>) {
    const { results, colDefs } = props;

    return (
        <table className={styles.resultsTable}>
            <thead>
                <tr>
                    {colDefs.map((menu: TResultsHeaders<T>) => {
                        return <th key={`column-header-${menu.key}`}>{menu.label}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {results.map((record: T, index: number) => {
                    return (
                        <tr key={`advocate-table-row-${index}`}>
                            {colDefs.map((cell: TResultsHeaders<T>) => {
                                const display = cell.valueFormatter(record);
                                const cellStyle = typeof display === 'number' ? styles.numericCell : '';
                                return (
                                    <td key={`results-table-key-${cell.key}`} className={cellStyle}>
                                        {display}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
