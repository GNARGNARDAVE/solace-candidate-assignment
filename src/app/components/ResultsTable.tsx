import { FC } from 'react';
import { IResultsTable, TResultsHeaders } from '@/app/types/components/results-table';

import styles from './results-tables.module.scss';
import { useSort } from '@/app/hooks/use-sort';

/**
 *  Results Table is a generic table, which driven by the colDefs and reinforced by the generic type passed in.
 */
export const ResultsTable: FC = <T,>(props: IResultsTable<T>) => {
    const { results, colDefs, id, updateSearch, children } = props;
    const { key, sort, orderBy } = useSort<T>();

    const onHeaderClick = (key: keyof T, sort) => {
        orderBy({ key, sort });
        updateSearch({ key, sort });
    };

    return (
        <>
            {children}
            <table className={styles.resultsTable} data-testid={id}>
                <thead>
                    <tr>
                        {colDefs.map((menu: TResultsHeaders<T>) => {
                            return (
                                <th
                                    key={`column-header-${String(menu.key)}`}
                                    data-testid={`column-header-${String(menu.key)}`}
                                    onClick={() => onHeaderClick(menu.key, sort)}>
                                    {menu.label}
                                    {key === menu.key && (
                                        <span
                                            className={`${sort === 'DESC' ? styles.chevronDesc : styles.chevronAsc}`}
                                            data-testid={`${menu.key}-sort`}/>
                                    )}
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
                                        <td
                                            key={`results-table-key-${String(cell.key)}`}
                                            className={cellStyle}
                                            data-testid={`searchResultsRow${index}Key${String(cell.key)}`}>
                                            {display}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ResultsTable;
