import React from 'react';
import { IResultsTable, TResultsHeaders } from '@/app/types/components/results-table';

import styles from './results-tables.module.scss';

export default function ResultsTable<T>(props: IResultsTable<T>) {
    const { results, colDefs , id } = props;

    return (
        <table className={styles.resultsTable} data-testid={id}>
            <thead>
                <tr>
                    {colDefs.map((menu: TResultsHeaders<T>) => {
                        return (
                            <th key={`column-header-${String(menu.key)}`} data-testid={`column-header-${String(menu.key)}`}>
                                {menu.label}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {results.map((record: T, index: number) => {
                    return (
                        <tr key={`advocate-table-row-${index}`}>
                            {colDefs.map((cell: TResultsHeaders<T>) => {
                                const display = cell.valueFormatter(record);
                                const cellStyle = typeof display === 'number' ? 'text-center' : 'text-left';
                                return (
                                    <td key={`results-table-key-${String(cell.key)}`} className={cellStyle} data-testid={`searchResultsRow${index}Key${String(cell.key)}`}>
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
