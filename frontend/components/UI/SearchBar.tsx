import styles from '@/sass/components/_searchbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// @TODO: Implement form submission functionality

const SearchBar = () => {
    return (
        <form className={styles['searchbar']}>
            <label htmlFor="searchbar">Search</label>
            <input
                type="text"
                name="searchbar"
                id="searchbar"
                placeholder="Search..."
            />
            <button type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span>Search</span>
            </button>
        </form>
    );
};

export default SearchBar;
