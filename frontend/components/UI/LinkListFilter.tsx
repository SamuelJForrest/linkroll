import { ChangeEvent, FC } from 'react';
import styles from '@/sass/components/_form.module.scss';

type LinkListFilterType = {
    filterLinks: (e: ChangeEvent<HTMLInputElement>) => void;
};

const LinkListFilter: FC<LinkListFilterType> = ({ filterLinks }) => {
    return (
        <form className={styles['form--filter']}>
            <div className={styles['form-wrap--filter']}>
                <div className={styles['form-field']}>
                    <label htmlFor="listFilter">Search</label>
                    <input
                        type="text"
                        name="listFilter"
                        id="listFiter"
                        onChange={filterLinks}
                        placeholder="Search profile..."
                    />
                </div>
            </div>
        </form>
    );
};

export default LinkListFilter;
