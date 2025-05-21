import React from 'react';
import styles from './phrase-search.module.scss';

interface IPhraseSearch {
    searchTerm: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
}

export default function PhraseSearch(props: IPhraseSearch) {
    const { searchTerm, onChange, onClick } = props;

    return (
        <div className={styles.phraseSearch}>
            <div className={styles.displayPhrase}>
                {searchTerm && (
                    <div className="search-input-container">
                        Searching for: <span id="searchTerm">{searchTerm}</span>
                    </div>
                )}
            </div>
            <div className={styles.searchInputContainer}>
                <input className={styles.searchInput} onChange={onChange} onBlur={onChange} placeholder={'Search'} />
                <button onClick={onClick}>Reset Search</button>
            </div>
        </div>
    );
}
