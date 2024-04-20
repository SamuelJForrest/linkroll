import { FC } from 'react';
import styles from '@/sass/components/_form.module.scss';

type LinkListFilterType = {
    filterLinks: () => void;
};

const LinkListFilter: FC<LinkListFilterType> = ({ filterLinks }) => {
    return (
        <form onSubmit={filterLinks} className={styles['form--filter']}>
            <div className={styles['form-wrap--filter']}>
                <div className={styles['form-field']}>
                    <label htmlFor="listFilter">Search</label>
                    <input type="text" name="listFilter" id="listFiter" />
                </div>
            </div>
        </form>
    );
};

export default LinkListFilter;
