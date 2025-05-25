import { FC } from 'react';
import styles from './phrase-search.module.scss';

interface IPhraseSearch {
    searchTerm: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
}

const PhraseSearch: FC = (props: IPhraseSearch) => {
    const { searchTerm, onChange, onClick } = props;

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
                <input
                    className={styles.searchInput}
                    onChange={onChange}
                    onBlur={onChange}
                    value={searchTerm}
                    placeholder={'Search'}
                    data-testid="searchInput"
                />
                <button onClick={onClick} className={styles.resetBtn} data-testid="searchReset">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default PhraseSearch;
