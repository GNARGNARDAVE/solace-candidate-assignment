import { ChangeEvent, FC } from 'react';
import styles from './phrase-search.module.scss';
import { TResultsHeaders } from '@/app/types/components/results-table';

interface IPhraseSearch<T> {
    colDefs: TResultsHeaders<T>[];
    searchTerm: string;
    searchSelect: keyof T;
    onClick: () => void;
    onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch: () => void;

}

/**
 * Phrase Search is a generic component that can complement any Results Table component.
 *
 * It is a generic component that can be customized by passing in the type, colDefs, and handlers to add more functionality
 * to the results table by allowing users to filtering keys from the table.
 *
 */
const PhraseSearch: FC = <T,>(props: IPhraseSearch<T>) => {
    const { searchTerm, searchSelect, onSelectChange, onTextChange, onSearch, colDefs, onClick } = props;

    return (
        <div className={styles.phraseSearch}>
            <div className={styles.displayPhrase}>
                {searchTerm && (
                    <div className={styles.searchInputPhrase}>
                        <strong>Searching for</strong>: <span data-testid="searchTerm">"{searchTerm}"</span>
                    </div>
                )}
            </div>
            <div className={styles.searchInputContainer}>
                <select
                    className={styles.searchSelect}
                    onChange={onSelectChange}>
                    defaultValue={searchSelect}
                    {colDefs.map((item:TResultsHeaders<T>, idx: number) => (
                        <option
                            key={`phrase-search-item-${idx}`}
                            value={item.key as string}>
                            {item.label}
                        </option>
                    ))}
                    <option value="someOption"> Some option</option>
                </select>
                <input
                    className={styles.searchInput}
                    onChange={onTextChange}
                    onBlur={onTextChange}
                    value={searchTerm}
                    placeholder={'Search'}
                    data-testid="searchInput"
                />
                <button onClick={onSearch} className={styles.searchBtn} data-testid="searchReset">
                    Search
                </button>
                <button onClick={onClick} className={styles.resetBtn} data-testid="searchReset">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default PhraseSearch;
