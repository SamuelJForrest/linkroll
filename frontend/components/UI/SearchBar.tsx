import styles from '@/sass/components/_searchbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// @TODO: Implement form submission functionality

const SearchBar = () => {
    return (
        <form action="/search" className={styles['searchbar']}>
            <label htmlFor="q">Search</label>
            <input type="text" name="q" id="q" placeholder="Search..." />
            <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span>Search</span>
            </button>
        </form>
    );
};

export default SearchBar;
